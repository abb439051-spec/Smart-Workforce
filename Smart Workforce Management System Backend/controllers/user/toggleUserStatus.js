const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");

const toggleUserStatus = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await UsersModel.findOne({
            _id: id,
            workspaceId: req.user.workspaceId,
            role: "employee",
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        if (req.user.role === "manager") {
            const assigned = await DepartmentModel.exists({
                _id: user.departmentId,
                workspaceId: req.user.workspaceId,
                managerId: req.user._id,
            });

            if (!assigned) {
                return res.status(403).json({
                    success: false,
                    message: "You can only change employees in your assigned departments.",
                });
            }
        }

        user.isActive = !user.isActive;

        await user.save();

        return res.status(200).json({
            success: true,
            message: user.isActive
                ? "Employee activated successfully"
                : "Employee deactivated successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = toggleUserStatus;