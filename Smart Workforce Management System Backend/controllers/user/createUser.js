const bcrypt = require("bcrypt");

const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");

const {createUserValidation,} = require("../../services/validation/user.validation");

const createUser = async (req, res) => {

    try {

        const data =
            await createUserValidation.validateAsync(req.body);

        const existingUser =
            await UsersModel.findOne({

                workspaceId: req.user.workspaceId,

                userEmail: data.userEmail,

            });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already exists.",

            });

        }

        if (req.user.role === "manager") {
            const department = await DepartmentModel.findOne({
                _id: data.departmentId,
                workspaceId: req.user.workspaceId,
                managerId: req.user._id,
            });

            if (data.role !== "employee" || !department) {
                return res.status(403).json({
                    success: false,
                    message: "You can only add employees to your assigned departments.",
                });
            }
        }

        const totalEmployees =
            await UsersModel.countDocuments({

                workspaceId: req.user.workspaceId,

            });

        const employeeId =
            `EMP${String(totalEmployees + 1).padStart(3, "0")}`;

        const hashedPassword =
            await bcrypt.hash(data.password, 10);

        const user =
            await UsersModel.create({

                workspaceId: req.user.workspaceId,

                departmentId: data.role === "employee" ? data.departmentId : null,

                employeeId,

                name: data.name,

                userEmail: data.userEmail,

                password: hashedPassword,

                phone: data.phone,

                designation: data.designation,

                role: data.role,

                skills: data.skills,
                experience: Number(data.experience || 0),
                weeklyCapacity: data.weeklyCapacity,

                employmentType: data.employmentType,

            });

        return res.status(201).json({

            success: true,

            message: "User created successfully.",

            user,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = createUser;