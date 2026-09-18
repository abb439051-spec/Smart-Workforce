const DepartmentModel = require("../../models/Department.model");
const UsersModel = require("../../models/Users.model");
const {createDepartmentValidation,} = require("../../services/validation/department.validation");

const createDepartment = async (req, res) => {

    try {

        const data = await createDepartmentValidation.validateAsync(req.body);
        
        const existingDepartment = await DepartmentModel.findOne({
            workspaceId: req.user.workspaceId,
            departmentName: data.departmentName.trim(),
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

        const department =
            await DepartmentModel.create({

                workspaceId: req.user.workspaceId,

                departmentName: data.departmentName,

                departmentCode: data.departmentCode,

                description: data.description,

                managerId: data.managerId || null,

                maxWeeklyCapacity: data.maxWeeklyCapacity,

                createdBy: req.user._id,
            });

        return res.status(201).json({

            success: true,

            message: "Department Created Successfully",

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

module.exports = createDepartment;