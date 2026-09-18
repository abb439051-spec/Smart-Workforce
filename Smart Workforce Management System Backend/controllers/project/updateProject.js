const ProjectModel = require("../../models/Projects.model");
const DepartmentModel = require("../../models/Department.model");

const {createProjectValidation,} = require("../../services/validation/project.validation");

const updateProject = async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = createProjectValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const managerDepartments = req.user.role === "manager"
      ? await DepartmentModel.find({
          workspaceId: req.user.workspaceId,
          managerId: req.user._id,
        }).distinct("_id")
      : [];

    const project = await ProjectModel.findOne({
      _id: id,
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

    const department = await DepartmentModel.findOne({
      _id: req.body.departmentId,
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
        message: "You can only use your assigned departments.",
      });
    }

    const duplicateProject = await ProjectModel.findOne({
      workspaceId: req.user.workspaceId,
      projectName: req.body.projectName,
      _id: { $ne: id },
    });

    if (duplicateProject) {
      return res.status(400).json({
        success: false,
        message: "Project name already exists",
      });
    }

    const projectUpdate = {
        projectName: req.body.projectName,
        description: req.body.description,
        departmentId: req.body.departmentId,
        managerId: req.user.role === "manager" ? req.user._id : req.body.managerId || null,
        teamMembers: req.body.teamMembers || [],
        priority: req.body.priority,
        status: req.body.status,
        estimatedHours: req.body.estimatedHours,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };
    const normalizedProjectCode = req.body.projectCode?.trim();
    if (normalizedProjectCode) {
      projectUpdate.projectCode = normalizedProjectCode;
    } else {
      projectUpdate.$unset = { projectCode: 1 };
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      projectUpdate,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
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

module.exports = updateProject;