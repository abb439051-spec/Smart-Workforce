const bcrypt = require("bcryptjs");
const UsersModel = require("../../models/Users.model");

const resetUserPassword = async (req, res) => {
    try {
        const { password } = req.body;

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const user = await UsersModel.findOne({
            _id: req.params.id,
            workspaceId: req.user.workspaceId,
            role: { $in: ["employee", "manager"] },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Employee or manager not found",
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only administrators can directly change passwords. Use the forgot-password approval flow instead.",
            });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("Reset user password error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to change password",
        });
    }
};

module.exports = resetUserPassword;
