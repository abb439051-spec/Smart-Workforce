const UsersModel = require("../../models/Users.model");

const getUser = async (req, res) => {

    try {

        const user = await UsersModel.findOne({

            _id: req.params.id,

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

        return res.status(200).json({

            success: true,

            user,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = getUser;