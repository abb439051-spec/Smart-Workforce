const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");

const updateProfile = async (req, res) => {
    try {
        const { name, phone, designation, skills } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const normalizedSkills = Array.isArray(skills)
            ? skills.map((skill) => String(skill).trim()).filter(Boolean)
            : typeof skills === "string"
                ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
                : [];

        const user = await UsersModel.findOneAndUpdate(
            {
                _id: req.user._id,
                workspaceId: req.user.workspaceId,
            },
            {
                name: name.trim(),
                phone: phone || "",
                designation: designation || "",
                skills: normalizedSkills,
            },
            { new: true, runValidators: true }
        )
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
            message: "Profile updated successfully",
            user: {
                ...user.toObject(),
                departments,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile",
        });
    }
};

module.exports = updateProfile;
