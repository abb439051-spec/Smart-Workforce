const ProjectModel = require("../../models/Projects.model");
const TaskModel = require("../../models/Tasks.model");

const deleteProject = async (req, res) => {
  try {

    const { id } = req.params;

    const project = await ProjectModel.findOne({
      _id: id,
      workspaceId: req.user.workspaceId,
      ...(req.user.role === "manager" ? { managerId: req.user._id } : {}),
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const taskCount = await TaskModel.countDocuments({
      workspaceId: req.user.workspaceId,
      projectId: id,
    });

    if (taskCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Project contains tasks. Archive it instead.",
      });
    }

    await ProjectModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = deleteProject;