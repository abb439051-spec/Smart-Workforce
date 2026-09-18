const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");

const updateProjectProgress = require("../project/updateProjectProgress");
const updateEmployeeWorkload = require("../../services/ai/updateEmployeeWorkload");

const deleteTask = async (req, res) => {
  try {

    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Save IDs before deleting
    const projectId = task.projectId;
    const employeeId = task.assignedTo;

    if (req.user.role === "manager") {

      const project = await ProjectModel.findOne({
        _id: projectId,
        workspaceId: req.user.workspaceId,
        $or: [
          { managerId: req.user._id },
          {
            departmentId: {
              $in: await DepartmentModel.find({
                workspaceId: req.user.workspaceId,
                managerId: req.user._id,
              }).distinct("_id"),
            },
          },
        ],
      });

      if (
        !project ||
        project.managerId.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this task.",
        });
      }

    }

    if (req.user.role === "employee") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete tasks.",
      });
    }

    await TaskModel.findByIdAndDelete(taskId);

    // Update project completion
    await updateProjectProgress(projectId);

    // Update employee workload
    await updateEmployeeWorkload(employeeId);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = deleteTask;