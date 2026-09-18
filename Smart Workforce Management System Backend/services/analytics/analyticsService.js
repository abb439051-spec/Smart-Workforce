const UsersModel = require("../../models/Users.model");
const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");
const NotificationModel = require("../../models/Notifications.model");

const calculateWorkloadCategory = (capacityPercentage) => {
  if (capacityPercentage <= 40) {
    return "Available";
  }

  if (capacityPercentage <= 70) {
    return "Moderate";
  }

  if (capacityPercentage <= 90) {
    return "Busy";
  }

  if (capacityPercentage <= 100) {
    return "Overloaded";
  }

  return "Critical";
};

const calculateProductivity = (tasks) => {
  if (!tasks.length) {
    return 0;
  }

  const totalCompletion = tasks.reduce(
    (total, task) =>
      total + Number(task.completionPercentage || 0),
    0
  );

  return Number(
    (totalCompletion / tasks.length).toFixed(2)
  );
};

const calculateBurnoutRisk = (employeeWorkloads) => {
  if (!employeeWorkloads.length) {
    return 0;
  }

  const totalRisk = employeeWorkloads.reduce((total, employee) => {
    const capacity = employee.capacityPercentage;
    const risk = capacity <= 70
      ? 0
      : capacity <= 90
        ? ((capacity - 70) / 20) * 50
        : capacity <= 100
          ? 50 + ((capacity - 90) / 10) * 25
          : Math.min(100, 75 + ((capacity - 100) / 100) * 25);

    return total + risk;
  }, 0);

  return Number((totalRisk / employeeWorkloads.length).toFixed(2));
};

const calculateWorkloadBalance = (employeeWorkloads) => {
  if (!employeeWorkloads.length) {
    return 100;
  }

  const capacities = employeeWorkloads.map(
    (employee) => employee.capacityPercentage
  );
  const averageCapacity =
    capacities.reduce((total, capacity) => total + capacity, 0) /
    capacities.length;
  const standardDeviation = Math.sqrt(
    capacities.reduce(
      (total, capacity) => total + ((capacity - averageCapacity) ** 2),
      0
    ) / capacities.length
  );
  const distributionScore = Math.max(0, 100 - standardDeviation);
  const healthScore = employeeWorkloads.reduce((total, employee) => {
    const capacity = employee.capacityPercentage;
    const health = capacity <= 90
      ? 100
      : capacity <= 100
        ? 100 - ((capacity - 90) * 5)
        : Math.max(0, 50 - ((capacity - 100) * 0.5));

    return total + health;
  }, 0) / employeeWorkloads.length;

  return Number(((healthScore * 0.6) + (distributionScore * 0.4)).toFixed(2));
};

const calculateDelayPredictions = (tasks, employeeWorkloads) => {
  const workloadByEmployee = new Map(
    employeeWorkloads.map((employee) => [
      String(employee.employeeId),
      employee,
    ])
  );
  const now = new Date();

  return tasks
    .filter((task) => task.status !== "Completed" && task.dueDate)
    .map((task) => {
      const employee = workloadByEmployee.get(String(task.assignedTo));
      const completion = Math.min(100, Math.max(0, Number(task.completionPercentage || 0)));
      const remainingHours = Number(
        (Number(task.estimatedHours || 0) * (1 - completion / 100)).toFixed(2)
      );
      const dailyCapacity = employee
        ? Math.max(1, Number(employee.weeklyCapacity || 40) / 5)
        : 8;
      const predictedDays = Math.ceil(remainingHours / dailyCapacity);
      const predictedCompletionDate = new Date(now);
      predictedCompletionDate.setDate(predictedCompletionDate.getDate() + predictedDays);

      const dueDate = new Date(task.dueDate);
      const daysUntilDue = Math.ceil((dueDate - now) / 86400000);
      const isAtRisk = predictedCompletionDate > dueDate || daysUntilDue < 0;

      return {
        taskId: task._id,
        taskName: task.taskName,
        assignedTo: employee?.name || "Unassigned",
        dueDate,
        predictedCompletionDate,
        remainingHours,
        daysUntilDue,
        predictedDays,
        risk: isAtRisk ? "High" : daysUntilDue - predictedDays <= 1 ? "Medium" : "Low",
        reason: isAtRisk
          ? "Current workload suggests completion after the due date."
          : "Projected completion is within the planned deadline.",
      };
    })
    .filter((prediction) => prediction.risk !== "Low")
    .sort((a, b) => {
      const riskOrder = { High: 0, Medium: 1 };
      return riskOrder[a.risk] - riskOrder[b.risk] || a.daysUntilDue - b.daysUntilDue;
    })
    .slice(0, 10);
};

const getAnalyticsDashboard = async (workspaceId, requester = {}) => {
  /*
   * ---------------------------------------
   * FETCH WORKSPACE DATA
   * ---------------------------------------
   */

  let departmentFilter;
  let projectFilter;
  let projectIds;

  if (requester.role === "manager") {
    const managedDepartments = await DepartmentModel.find({
      workspaceId,
      managerId: requester._id,
    }).select("_id").lean();
    const departmentIds = managedDepartments.map((department) => department._id);

    projectFilter = {
      workspaceId,
      isActive: true,
      $or: [
        { managerId: requester._id },
        { departmentId: { $in: departmentIds } },
      ],
    };
    departmentFilter = { $in: departmentIds };
    projectIds = await ProjectModel.find(projectFilter).distinct("_id");
  }

  const [
    employees,
    workforceMembers,
    tasks,
    projects,
    departments,
  ] = await Promise.all([
    UsersModel.find({
      workspaceId,
      role: "employee",
      isActive: true,
      ...(departmentFilter ? { departmentId: departmentFilter } : {}),
    }).lean(),

    UsersModel.find({
      workspaceId,
      role: { $in: ["employee", "manager"] },
      isActive: true,
      ...(departmentFilter ? {
        $or: [
          { role: "manager", _id: requester._id },
          { role: "employee", departmentId: departmentFilter },
        ],
      } : {}),
    }).select("_id").lean(),

    TaskModel.find({
      workspaceId,
      isActive: true,
      ...(projectFilter ? {
        projectId: { $in: projectIds },
      } : {}),
    }).lean(),

    ProjectModel.find(projectFilter || {
      workspaceId,
      isActive: true,
    }).lean(),

    DepartmentModel.find({
      workspaceId,
      ...(departmentFilter ? { _id: departmentFilter } : {}),
    }).lean(),
  ]);

  /*
   * ---------------------------------------
   * EMPLOYEE PRODUCTIVITY
   * ---------------------------------------
   */

  const employeeProductivity =
    calculateProductivity(tasks);

  /*
   * ---------------------------------------
   * TASK STATISTICS
   * ---------------------------------------
   */

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed"
  );

  const tasksCompleted =
    completedTasks.length;

  /*
   * ---------------------------------------
   * PROJECT SUCCESS
   * ---------------------------------------
   *
   * Based on average completion percentage
   * of active projects.
   */

  let projectSuccess = 0;

  if (projects.length) {
    const totalProjectCompletion =
      projects.reduce(
        (total, project) =>
          total +
          Number(
            project.completionPercentage || 0
          ),
        0
      );

    projectSuccess = Number(
      (
        totalProjectCompletion /
        projects.length
      ).toFixed(2)
    );
  }

  /*
   * ---------------------------------------
   * WORKLOAD DISTRIBUTION
   * ---------------------------------------
   */

  const workloadCounts = {
    Available: 0,
    Moderate: 0,
    Busy: 0,
    Overloaded: 0,
    Critical: 0,
  };

  const employeeWorkloads =
    employees.map((employee) => {
      const employeeTasks =
        tasks.filter(
          (task) =>
            String(task.assignedTo) ===
            String(employee._id) &&
            [
              "Todo",
              "In Progress",
              "Review",
            ].includes(task.status)
        );

      const currentWorkload =
        employeeTasks.reduce(
          (total, task) =>
            total +
            Number(
              task.estimatedHours || 0
            ),
          0
        );

      const weeklyCapacity =
        Number(
          employee.weeklyCapacity || 40
        );

      const capacityPercentage =
        weeklyCapacity > 0
          ? Number(
              (
                (currentWorkload /
                  weeklyCapacity) *
                100
              ).toFixed(2)
            )
          : 0;

      const category =
        calculateWorkloadCategory(
          capacityPercentage
        );

      workloadCounts[category] += 1;

      return {
        employeeId: employee._id,
        name: employee.name,
        departmentId:
          employee.departmentId,
        currentWorkload,
        weeklyCapacity,
        capacityPercentage,
        workloadCategory: category,
        activeTasks: employeeTasks.map((task) => ({
          taskId: task._id,
          taskName: task.taskName,
          estimatedHours: Number(task.estimatedHours || 0),
          priority: task.priority,
        })),
      };
    });

  /*
   * ---------------------------------------
   * WORKLOAD CHART DATA
   * ---------------------------------------
   */

  const workload = Object.entries(
    workloadCounts
  ).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const burnoutRisk = calculateBurnoutRisk(employeeWorkloads);
  const overloadedEmployees = employeeWorkloads.filter((employee) =>
    ["Overloaded", "Critical"].includes(employee.workloadCategory)
  );
  const availableEmployees = employeeWorkloads.filter((employee) =>
    employee.capacityPercentage <= 70
  );
  const workloadBalance = calculateWorkloadBalance(employeeWorkloads);
  const delayPredictions = calculateDelayPredictions(tasks, employeeWorkloads);
  const busiestEmployees = [...employeeWorkloads]
    .sort((a, b) => b.capacityPercentage - a.capacityPercentage)
    .slice(0, 2);
  const workloadRecommendations = overloadedEmployees.length || workloadBalance < 80
    ? [{
        action: "Redistribute active tasks",
        details: availableEmployees.length
          ? `Move ${busiestEmployees[0]?.activeTasks?.slice(0, 3).map((task) => `"${task.taskName}"`).join(", ") || "suitable lower-priority work"} from ${busiestEmployees[0]?.name || "the busiest team member"} to ${availableEmployees[0]?.name || "an available team member"} to reduce overload.`
          : `Review priorities and redistribute work from the busiest team members: ${busiestEmployees.map((employee) => `${employee.name} (${employee.capacityPercentage}%)`).join(", ")}.`,
        fromEmployee: busiestEmployees[0]?.name || null,
        toEmployee: availableEmployees[0]?.name || null,
        tasks: busiestEmployees[0]?.activeTasks?.slice(0, 3) || [],
      }]
    : [];
  const hasOverloadedEmployees = overloadedEmployees.length > 0;
  const needsWorkloadAttention =
    hasOverloadedEmployees || burnoutRisk >= 50 || workloadBalance < 80;

  if (needsWorkloadAttention) {
    const recipients = requester.role === "manager"
      ? [
          requester._id,
          ...(await UsersModel.find({
            workspaceId,
            role: "admin",
            isActive: true,
          }).distinct("_id")),
        ]
      : await UsersModel.find({
          workspaceId,
          role: "admin",
          isActive: true,
        }).distinct("_id");

    await Promise.all([...new Set(recipients.map(String))].map(async (userId) => {
      const exists = await NotificationModel.exists({
        workspaceId,
        userId,
        type: "Workload",
        title: "Workforce health needs attention",
        isRead: false,
      });

      if (!exists) {
        await NotificationModel.create({
          workspaceId,
          userId,
          title: "Workforce health needs attention",
          message: `Burnout risk is ${burnoutRisk}% and workload balance is ${Math.round(workloadBalance)}%. ${workloadRecommendations[0]?.details || "Review active assignments and redistribute tasks where needed."}`,
          type: "Workload",
          priority: "High",
        });
      }
    }));
  }

  const highRiskDelays = delayPredictions.filter((prediction) => prediction.risk === "High");
  if (highRiskDelays.length) {
    const recipients = requester.role === "manager"
      ? [
          requester._id,
          ...(await UsersModel.find({
            workspaceId,
            role: "admin",
            isActive: true,
          }).distinct("_id")),
        ]
      : await UsersModel.find({
          workspaceId,
          role: "admin",
          isActive: true,
        }).distinct("_id");

    await Promise.all([...new Set(recipients.map(String))].map(async (userId) => {
      const exists = await NotificationModel.exists({
        workspaceId,
        userId,
        type: "Task",
        title: "Task delay risk detected",
        isRead: false,
      });

      if (!exists) {
        await NotificationModel.create({
          workspaceId,
          userId,
          title: "Task delay risk detected",
          message: `${highRiskDelays.length} active task(s) are projected to miss their deadlines. Review assignments and redistribute work.`,
          type: "Task",
          priority: "High",
        });
      }
    }));
  }

  /*
   * ---------------------------------------
   * DEPARTMENT PERFORMANCE
   * ---------------------------------------
   */

  const departmentsData =
    departments.map((department) => {
      const departmentEmployees =
        employees.filter(
          (employee) =>
            String(
              employee.departmentId
            ) ===
            String(department._id)
        );

      const departmentTasks =
        tasks.filter(
          (task) =>
            String(
              task.departmentId
            ) ===
            String(department._id)
        );

      const productivity =
        calculateProductivity(
          departmentTasks
        );

      const totalWorkload =
        departmentEmployees.reduce(
          (total, employee) => {
            const workload =
              employeeWorkloads.find(
                (item) =>
                  String(
                    item.employeeId
                  ) ===
                  String(employee._id)
              );

            return (
              total +
              Number(
                workload?.currentWorkload ||
                  0
              )
            );
          },
          0
        );

      return {
        departmentId:
          department._id,

        department:
          department.departmentName,

        productivity,

        employeeCount:
          departmentEmployees.length,

        taskCount:
          departmentTasks.length,

        currentWorkload:
          totalWorkload,
      };
    });

  /*
   * ---------------------------------------
   * PRODUCTIVITY BY DAY
   * ---------------------------------------
   *
   * Uses task creation date and completion
   * percentage to create the weekly chart.
   */

  const today = new Date();

  const productivity = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );

    const startOfDay =
      new Date(date);

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );

    const endOfDay =
      new Date(date);

    endOfDay.setHours(
      23,
      59,
      59,
      999
    );

    const dayTasks =
      tasks.filter((task) => {
        const createdAt =
          new Date(task.createdAt);

        return (
          createdAt >= startOfDay &&
          createdAt <= endOfDay
        );
      });

    const dayProductivity =
      calculateProductivity(
        dayTasks
      );

    productivity.push({
      day: date.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      ),

      productivity:
        dayProductivity,
    });
  }

  /*
   * ---------------------------------------
   * RETURN DASHBOARD DATA
   * ---------------------------------------
   */

  return {
    cards: {
      totalEmployees: workforceMembers.length,
      activeProjects: projects.length,
      pendingTasks: tasks.filter(
        (task) => task.status !== "Completed"
      ).length,
      employeeProductivity,
      tasksCompleted,
      projectSuccess,
      burnoutRisk,
      workloadBalance: Number(workloadBalance.toFixed(2)),
    },

    productivity,

    workload,

    departments:
      departmentsData,

    employeeWorkloads,
    workloadRecommendations,
    delayPredictions,
    burnoutRisk,
    overloadAlerts: employeeWorkloads
      .filter((employee) =>
        ["Overloaded", "Critical"].includes(employee.workloadCategory)
      )
      .map((employee) => ({
        employeeId: employee.employeeId,
        name: employee.name,
        category: employee.workloadCategory,
        capacityPercentage: employee.capacityPercentage,
        currentWorkload: employee.currentWorkload,
        weeklyCapacity: employee.weeklyCapacity,
      })),
  };
};

module.exports = {
  getAnalyticsDashboard,
};