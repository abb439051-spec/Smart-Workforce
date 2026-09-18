const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");
const updateEmployeeWorkload = require("../../services/ai/updateEmployeeWorkload");
const {updateUserValidation,} = require("../../services/validation/user.validation");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDetails =
      await updateUserValidation.validateAsync(req.body);

    const existingUser = await UsersModel.findOne({
      _id: id,
      workspaceId: req.user.workspaceId,
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (req.user.role === "manager") {
      const department = await DepartmentModel.findOne({
        _id: userDetails.departmentId,
        workspaceId: req.user.workspaceId,
        managerId: req.user._id,
      });

      if (existingUser.role !== "employee" || userDetails.role !== "employee" || !department) {
        return res.status(403).json({
          success: false,
          message: "You can only update employees in your assigned departments.",
        });
      }
    }

    const emailExists = await UsersModel.findOne({
      workspaceId: req.user.workspaceId,
      userEmail: userDetails.userEmail,
      _id: { $ne: id },
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const updatedUser =
      await UsersModel.findByIdAndUpdate(
        { _id: id, workspaceId: req.user.workspaceId },
        {
          ...userDetails,
          departmentId: userDetails.role === "employee"
            ? userDetails.departmentId
            : null,
          experience: Number(userDetails.experience || 0),
        },
        {
          new: true,
        }
      );

    if (updatedUser.role === "employee") {
      await updateEmployeeWorkload(updatedUser._id);
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      user: updatedUser,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = updateUser;