const UsersModel = require("../../models/Users.model");

const calculateEmployeeScore = require("./calculateEmployeeScore");

const recommendEmployee = async (req, res) => {
  try {
    const {
      departmentId,
      taskName = "",
      taskType = "",
      description = "",
    } = req.body;

    if (!departmentId) {
      return res.status(400).json({
        success: false,
        message: "Department is required",
      });
    }

    const employees = await UsersModel.find({
      workspaceId: req.user.workspaceId,
      departmentId,
      role: "employee",
      isActive: true,
    }).select("-password");

    if (!employees.length) {
      return res.status(404).json({
        success: false,
        message: "No employees found.",
      });
    }

    const scoredEmployees = employees.map(
      (employee) => {
        const result =
          calculateEmployeeScore(
            employee,
            {
              taskName,
              taskType,
              description,
            }
          );

        return {
          ...employee.toObject(),

          score: result.score,

          breakdown: result.breakdown,

          capacityPercentage:
            result.capacityPercentage,
        };
      }
    );

    scoredEmployees.sort(
      (a, b) =>
        b.score - a.score
    );

    return res.status(200).json({
      success: true,

      recommendedEmployee:
        scoredEmployees[0],

      rankings:
        scoredEmployees,
    });
  } catch (error) {
    console.error(
      "Recommend employee error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports =
  recommendEmployee;