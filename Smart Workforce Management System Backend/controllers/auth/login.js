const UsersModel = require("../../models/Users.model");
const {loginValidation} = require("../../services/validation/auth.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_secret = require("../../config/jwt");

const login = async (req, res) => {
    try {
        const loginDetails = await loginValidation.validateAsync(req.body);

        const { email, password } = loginDetails;

        const user = await UsersModel.findOne({
            userEmail: email,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact your administrator.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            {
                _id: user._id,
                workspaceId: user.workspaceId,
                role: user.role,
            },
            JWT_secret,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.userEmail,
                role: user.role,
            },
        });


    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to sign in",
        });
    }
};

module.exports = login;