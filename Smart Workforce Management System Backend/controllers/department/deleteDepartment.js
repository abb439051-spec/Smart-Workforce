const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");
const ProjectModel = require("../../models/Projects.model");

const deleteDepartment = async (req, res) => {
    try {

        const { id } = req.params;

        const department = await DepartmentModel.findOne({
            _id: id,
            workspaceId: req.user.workspaceId,
        });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found",
            });
        }

        const [employeeCount, projectCount] = await Promise.all([
            UsersModel.countDocuments({
                workspaceId: req.user.workspaceId,
                departmentId: id,
                role: "employee",
            }),
            ProjectModel.countDocuments({
                workspaceId: req.user.workspaceId,
                departmentId: id,
            }),
        ]);

        if (employeeCount || projectCount) {
            return res.status(400).json({
                success: false,
                message: "Move or remove assigned employees and projects before deleting this department.",
            });
        }

        await DepartmentModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = deleteDepartment;