const bcrypt = require("bcrypt");
const WorkspaceModel = require("../../models/Workspace.model");
const UsersModel = require("../../models/Users.model");
const VerificationModel = require("../../models/WorkspaceSignupVerification.model");
const { hashOtp } = require("../../services/auth/workspaceSignupEmail");
const {createWorkspaceValidation} = require("../../services/validation/auth.validation");

const createWorkspace = async (req, res) => {
    try {
        const workspaceDetails = await createWorkspaceValidation.validateAsync(req.body);

        const {
            companyName,
            adminName,
            email,
            password,
            otp,
        } = workspaceDetails;
        const normalizedEmail = email.toLowerCase().trim();

        const checkWorkspace = await WorkspaceModel.findOne({
            companyEmail: normalizedEmail,
        });

        if (checkWorkspace) {
            return res.status(400).json({
                message: "Workspace Already Exists!!",
                success: false,
            });
        }

        const verification = await VerificationModel.findOne({
            email: normalizedEmail,
            otpHash: hashOtp(otp),
            expiresAt: { $gt: new Date() },
        });

        if (!verification) {
            return res.status(400).json({
                message: "Verify your email with a valid OTP before creating the workspace.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const saveWorkspace = await WorkspaceModel.create({
            companyName,
            companyEmail: normalizedEmail,
        });

        await UsersModel.create({
            workspaceId: saveWorkspace._id,
            name: adminName,
            userEmail: normalizedEmail,
            password: hashedPassword,
            role: "admin",
        });
        await VerificationModel.deleteOne({ _id: verification._id });

        return res.status(201).json({
            message: "Workspace Created Successfully!!",
            success: true,
        });
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
        }

        return res.status(500).json({
            message: "Unable to create workspace",
            success: false,
        });
    }
};

module.exports = createWorkspace;