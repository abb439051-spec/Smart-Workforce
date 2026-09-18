const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");
const NotificationModel = require("../../models/Notifications.model");

const updateProjectProgress = require("../project/updateProjectProgress");
const updateEmployeeWorkload = require("../../services/ai/updateEmployeeWorkload");

const {
  createTaskValidation,
} = require("../../services/validation/task.validation");

const updateTask = async (req, res) => {

  try {

    const { error } = createTaskValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const taskId = req.params.id;

    const managerDepartments = req.user.role === "manager"
      ? await DepartmentModel.find({
          workspaceId: req.user.workspaceId,
          managerId: req.user._id,
        }).distinct("_id")
      : [];

    const task = await TaskModel.findOne({
      _id: taskId,
      workspaceId: req.user.workspaceId,
      ...(req.user.role === "manager"
        ? {
            projectId: {
              $in: await ProjectModel.find({
                workspaceId: req.user.workspaceId,
                $or: [
                  { managerId: req.user._id },
                  { departmentId: { $in: managerDepartments } },
                ],
              }).distinct("_id"),
            },
          }
        : {}),
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Save previous values
    const oldProjectId = task.projectId;
    const oldAssignedTo = task.assignedTo;

    const {
      taskName,
      taskCode,
      taskType,
      description,
      projectId,
      departmentId,
      assignedTo,
      priority,
      status,
      estimatedHours,
      actualHours,
      completionPercentage,
      startDate,
      dueDate,
      remarks,
    } = req.body;

    const project = await ProjectModel.findOne({
      _id: projectId,
      workspaceId: req.user.workspaceId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

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

    task.taskName = taskName;
    const normalizedTaskCode = taskCode?.trim();
    if (normalizedTaskCode) {
      task.taskCode = normalizedTaskCode;
    } else {
      task.set("taskCode", undefined);
    }
    task.taskType = taskType;
    task.description = description;
    task.projectId = projectId;
    task.departmentId = departmentId;
    task.assignedTo = assignedTo;
    task.priority = priority;
    task.status = status;
    task.estimatedHours = estimatedHours;
    task.actualHours = actualHours;
    task.completionPercentage = completionPercentage;
    task.startDate = startDate;
    task.dueDate = dueDate;
    task.remarks = remarks;

    await task.save();

    // Update new project progress
    await updateProjectProgress(projectId);

    // Update old project if task moved
    if (oldProjectId.toString() !== projectId.toString()) {
      await updateProjectProgress(oldProjectId);
    }

    // Update current employee workload
    await updateEmployeeWorkload(assignedTo);

    // Update previous employee workload if reassigned
    if (oldAssignedTo.toString() !== assignedTo.toString()) {
      await updateEmployeeWorkload(oldAssignedTo);

      await NotificationModel.create({
        workspaceId: req.user.workspaceId,
        userId: assignedTo,
        title: "Task reassigned to you",
        message: `You have been assigned "${taskName}".`,
        type: "Task",
        priority: priority === "Critical" || priority === "High"
          ? "High"
          : priority === "Medium"
            ? "Medium"
            : "Low",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
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

module.exports = updateTask;