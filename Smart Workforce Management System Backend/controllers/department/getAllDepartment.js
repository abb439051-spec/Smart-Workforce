const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");

const getAllDepartments = async (req, res) => {
    try {

        const departments = await DepartmentModel.find({
            workspaceId: req.user.workspaceId,
            ...(req.user.role === "manager" ? { managerId: req.user._id } : {}),
        })
            .populate("managerId", "name userEmail employeeId")
            .sort({ departmentName: 1 });

        const departmentsWithCounts = await Promise.all(
            departments.map(async (department) => {
                const employeeCount = await UsersModel.countDocuments({
                    workspaceId: req.user.workspaceId,
                    departmentId: department._id,
                    role: "employee",
                });

                return {
                    ...department.toObject(),
                    employeeCount,
                };
            })
        );

        return res.status(200).json({
            success: true,
            departments: departmentsWithCounts,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = getAllDepartments;