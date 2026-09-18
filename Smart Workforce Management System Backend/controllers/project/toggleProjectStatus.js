const ProjectModel = require("../../models/Projects.model");

const toggleProjectStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const project = await ProjectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.isActive = !project.isActive;

    await project.save();

    return res.status(200).json({
      success: true,
      message: project.isActive
        ? "Project activated successfully"
        : "Project archived successfully",
      project,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = toggleProjectStatus;