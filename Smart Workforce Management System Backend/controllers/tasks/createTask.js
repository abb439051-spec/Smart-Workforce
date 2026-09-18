const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");
const NotificationModel = require("../../models/Notifications.model");

const updateProjectProgress = require("../project/updateProjectProgress");
const updateEmployeeWorkload = require("../../services/ai/updateEmployeeWorkload")

const {
  createTaskValidation,
} = require("../../services/validation/task.validation");

const createTask = async (req, res) => {
  try {

    const { error } = createTaskValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      taskName,
      taskCode,
      taskType,
      description,
      projectId,
      departmentId,
      assignedTo,
      priority,
      startDate,
      dueDate,
      remarks,
      estimatedHours,
    } = req.body;

    // Check project
    const managerDepartments = req.user.role === "manager"
      ? await DepartmentModel.find({
          workspaceId: req.user.workspaceId,
          managerId: req.user._id,
        }).distinct("_id")
      : [];

    const project = await ProjectModel.findOne({
      _id: projectId,
      workspaceId: req.user.workspaceId,
      ...(req.user.role === "manager"
        ? {
            $or: [
              { managerId: req.user._id },
              { departmentId: { $in: managerDepartments } },
            ],
          }
        : {}),
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check department
    const department = await DepartmentModel.findOne({
      _id: departmentId,
      workspaceId: req.user.workspaceId,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    // Check assigned employee
    const employee = await UsersModel.findOne({
      _id: assignedTo,
      workspaceId: req.user.workspaceId,
      isActive: true,
      role: { $in: ["employee", "manager"] },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Prevent duplicate task name inside same project
    const existingTask = await TaskModel.findOne({
      workspaceId: req.user.workspaceId,
      taskName,
      projectId,
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message:
          "Task already exists in this project",
      });
    }

    // Create new task
    const taskData = {
      workspaceId: req.user.workspaceId,

      taskName,

      taskType,

      description,

      projectId,

      departmentId,

      assignedTo,

      assignedBy: req.user._id,

      priority,

      // New task always starts here
      status: "Todo",

      estimatedHours: estimatedHours || 0,

      actualHours: 0,

      completionPercentage: 0,

      startDate,

      dueDate,

      remarks,

      createdBy: req.user._id,
    };

    const normalizedTaskCode = taskCode?.trim();
    if (normalizedTaskCode) {
      taskData.taskCode = normalizedTaskCode;
    }

    const task = await TaskModel.create(taskData);

    // Update project progress AFTER creating the task
    await updateProjectProgress(projectId);

    await updateEmployeeWorkload(assignedTo);

    await NotificationModel.create({
      workspaceId: req.user.workspaceId,
      userId: assignedTo,
      title: "New task assigned",
      message: `You have been assigned "${taskName}".`,
      type: "Task",
      priority: priority === "Critical" || priority === "High"
        ? "High"
        : priority === "Medium"
          ? "Medium"
          : "Low",
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Task code already exists. Use a unique task code or leave it blank.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = createTask;