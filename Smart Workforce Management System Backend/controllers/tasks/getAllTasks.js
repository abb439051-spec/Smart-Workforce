const TaskModel = require("../../models/Tasks.model");
const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");

const getAllTasks = async (req, res) => {

  try {

    let tasks = [];

    if (req.user.role === "admin") {

      tasks = await TaskModel.find({
        workspaceId: req.user.workspaceId,
      })
        .populate(
          "projectId",
          "projectName projectCode description priority status estimatedHours actualHours completionPercentage startDate endDate managerId"
        )
        .populate("departmentId", "departmentName")
        .populate("assignedTo", "name employeeId")
        .populate("assignedBy", "name employeeId");

    }

    else if (req.user.role === "manager") {

      const projects = await ProjectModel.find({
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
      }).select("_id");

      const projectIds = projects.map(project => project._id);

      tasks = await TaskModel.find({
        workspaceId: req.user.workspaceId,
        projectId: { $in: projectIds },
      })
        .populate(
          "projectId",
          "projectName projectCode description priority status estimatedHours actualHours completionPercentage startDate endDate managerId"
        )
        .populate("departmentId", "departmentName")
        .populate("assignedTo", "name employeeId")
        .populate("assignedBy", "name employeeId");

    }

    else {

      tasks = await TaskModel.find({
        workspaceId: req.user.workspaceId,
        assignedTo: req.user._id,
      })
        .populate(
          "projectId",
          "projectName projectCode description priority status estimatedHours actualHours completionPercentage startDate endDate managerId"
        )
        .populate("departmentId", "departmentName")
        .populate("assignedTo", "name employeeId")
        .populate("assignedBy", "name employeeId");

    }

    return res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = getAllTasks;