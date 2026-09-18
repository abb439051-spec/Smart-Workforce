const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");

const {createProjectValidation,} = require("../../services/validation/project.validation");

const createProject = async (req, res) => {
  try {

    const { error } = createProjectValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      projectName,
      projectCode,
      description,
      departmentId,
      managerId,
      teamMembers,
      priority,
      status,
      estimatedHours,
      startDate,
      endDate,
    } = req.body;

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

    if (
      req.user.role === "manager" &&
      String(department.managerId) !== String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only create projects in your assigned departments.",
      });
    }

    const existingProject = await ProjectModel.findOne({
      workspaceId: req.user.workspaceId,
      projectName,
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project already exists",
      });
    }

    const projectData = {

      workspaceId: req.user.workspaceId,

      projectName,

      description,

      departmentId,

      managerId: req.user.role === "manager"
        ? req.user._id
        : managerId || null,

      teamMembers: teamMembers || [],

      priority,

      status,

      estimatedHours,

      startDate,

      endDate,

      createdBy: req.user._id,
    };

    const normalizedProjectCode = projectCode?.trim();
    if (normalizedProjectCode) {
      projectData.projectCode = normalizedProjectCode;
    }

    const project = await ProjectModel.create(projectData);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Project code already exists. Use a unique project code or leave it blank.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = createProject;