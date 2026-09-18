const UsersModel = require("../../models/Users.model");
const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");

const calculateEmployeeScore = require("./calculateEmployeeScore");

const suggestEmployee = async (
  req,
  res
) => {
  try {

    const {
      projectId,
      departmentId,
      taskName = "",
      taskType = "",
      description = "",
      estimatedHours = 0,
    } = req.body;

    /*
     * Project is required because the task
     * belongs to a project.
     */

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message:
          "Project is required",
      });
    }

    const project = await ProjectModel.findOne({
      _id: projectId,
      workspaceId: req.user.workspaceId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    /*
     * Use project department if the
     * frontend has not supplied one.
     */

    const selectedDepartmentId =
      departmentId ||
      project.departmentId;

    const employeeQuery = {
      workspaceId:
        req.user.workspaceId,

      role: "employee",

      isActive: true,
    };

    /*
     * Keep recommendation within the
     * task/project department when possible.
     */

    if (selectedDepartmentId) {
      employeeQuery.departmentId =
        selectedDepartmentId;
    }

    const employees = await UsersModel.find(
      employeeQuery
    ).select("-password");

    if (!employees.length) {
      return res.status(404).json({
        success: false,
        message:
          "No active employees available for this department",
      });
    }

    const scoredEmployees = [];

    for (const employee of employees) {

      /*
       * ---------------------------------------
       * GET ACTIVE TASKS
       * ---------------------------------------
       */

      const activeTasks =
        await TaskModel.find({
          workspaceId:
            req.user.workspaceId,

          assignedTo:
            employee._id,

          status: {
            $in: [
              "Todo",
              "In Progress",
              "Review",
            ],
          },
        });

      /*
       * ---------------------------------------
       * CURRENT WORKLOAD
       * ---------------------------------------
       */

      const currentWorkload =
        activeTasks.reduce(
          (total, task) =>
            total +
            Number(
              task.estimatedHours || 0
            ),
          0
        );

      /*
       * ---------------------------------------
       * CAPACITY
       * ---------------------------------------
       */

      const weeklyCapacity =
        Number(
          employee.weeklyCapacity || 40
        );

      const workloadAfterTask =
        currentWorkload +
        Number(
          estimatedHours || 0
        );

      const capacityPercentage =
        weeklyCapacity > 0
          ? (
              workloadAfterTask /
              weeklyCapacity
            ) * 100
          : 100;

      /*
       * Workload information is passed
       * into the common scoring engine.
       */

      const workload = {
        currentHours:
          currentWorkload,

        afterAssignmentHours:
          workloadAfterTask,

        weeklyCapacity,

        capacityPercentage,
      };

      /*
       * ---------------------------------------
       * CALCULATE EMPLOYEE SCORE
       * ---------------------------------------
       */

      const result =
        calculateEmployeeScore(
          employee,
          {
            taskName,
            taskType,
            description,
          },
          workload
        );

      scoredEmployees.push({
        employee:
          employee.toObject(),

        score:
          result.score,

        breakdown:
          result.breakdown,

        workload: {
          currentHours:
            currentWorkload,

          afterAssignmentHours:
            workloadAfterTask,

          weeklyCapacity,

          capacityPercentage:
            Number(
              capacityPercentage.toFixed(2)
            ),
        },
      });
    }

    /*
     * ---------------------------------------
     * SORT BEST FIRST
     * ---------------------------------------
     */

    scoredEmployees.sort(
      (a, b) =>
        b.score - a.score
    );

    /*
     * Prefer employees who will remain
     * within their weekly capacity.
     */

    const availableEmployees =
      scoredEmployees.filter(
        (item) =>
          item.workload
            .capacityPercentage <= 100
      );

    /*
     * If everyone is overloaded,
     * choose the best-scoring person,
     * but clearly tell the frontend.
     */

    const bestMatch =
      availableEmployees.length > 0
        ? availableEmployees[0]
        : scoredEmployees[0];

    const isOverloaded =
      bestMatch.workload
        .capacityPercentage > 100;

    /*
     * ---------------------------------------
     * RESPONSE
     * ---------------------------------------
     */

    return res.status(200).json({

      success: true,

      message:
        "Employee recommendation generated",

      recommendedEmployee:
        bestMatch.employee,

      score:
        bestMatch.score,

      breakdown:
        bestMatch.breakdown,

      workload:
        bestMatch.workload,

      isOverloaded,

      rankings:
        scoredEmployees,

    });

  } catch (error) {

    console.error(
      "Suggest employee error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = suggestEmployee;