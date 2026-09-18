const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");

const profile = async (req, res) => {
    try {
        const user = await UsersModel.findOne({
            _id: req.user._id,
            workspaceId: req.user.workspaceId,
        })
            .populate("departmentId", "departmentName departmentCode")
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const departments = user.role === "manager"
            ? await DepartmentModel.find({
                workspaceId: req.user.workspaceId,
                managerId: req.user._id,
            }).select("departmentName departmentCode description")
            : [];

        return res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                departments,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to load profile",
        });
    }
};

module.exports = profile;
