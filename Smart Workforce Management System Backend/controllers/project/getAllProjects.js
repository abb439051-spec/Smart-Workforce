const ProjectModel = require("../../models/Projects.model");
const TaskModel = require("../../models/Tasks.model");
const DepartmentModel = require("../../models/Department.model");

const getAllProjects = async (req, res) => {
  try {

    let query = {
      workspaceId: req.user.workspaceId,
    };

    // Managers can only see projects they manage
    if (req.user.role === "manager") {
      const departments = await DepartmentModel.find({
        workspaceId: req.user.workspaceId,
        managerId: req.user._id,
      }).select("_id");

      query.$or = [
        { managerId: req.user._id },
        { departmentId: { $in: departments.map((department) => department._id) } },
      ];
    }

    if (req.user.role === "employee") {
      const tasks = await TaskModel.find({
        workspaceId: req.user.workspaceId,
        assignedTo: req.user._id,
      }).select("projectId");

      const taskProjectIds = tasks.map((task) => task.projectId);
      query.$or = [
        { teamMembers: req.user._id },
        { _id: { $in: taskProjectIds } },
      ];
    }

    const projects = await ProjectModel.find(query)
      .populate("departmentId", "departmentName")
      .populate("managerId","name employeeId designation userEmail")
      .populate("teamMembers","name employeeId designation")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = getAllProjects;