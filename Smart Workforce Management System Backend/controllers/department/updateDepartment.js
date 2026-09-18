const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");
const {createDepartmentValidation } = require("../../services/validation/department.validation");

const updateDepartment = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await createDepartmentValidation.validateAsync(req.body);

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

        const existingDepartment = await DepartmentModel.findOne({
            workspaceId: req.user.workspaceId,
            departmentName: data.departmentName.trim(),
            _id: { $ne: id },
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department already exists.",
            });
        }

        if (data.managerId) {
            const manager = await UsersModel.findOne({
                _id: data.managerId,
                workspaceId: req.user.workspaceId,
                role: "manager",
                isActive: true,
            });

            if (!manager) {
                return res.status(400).json({
                    success: false,
                    message: "Selected manager is not valid.",
                });
            }
        }

        department.departmentName = data.departmentName.trim();
        department.departmentCode = data.departmentCode.trim().toUpperCase();
        department.description = data.description;
        department.managerId = data.managerId || null;
        department.maxWeeklyCapacity = data.maxWeeklyCapacity;

        await department.save();

        return res.status(200).json({
            success: true,
            message: "Department Updated Successfully",
            department,
        });

    } catch (error) {
        if (error.isJoi || error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = updateDepartment;