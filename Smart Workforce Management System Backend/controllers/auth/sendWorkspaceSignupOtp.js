const UsersModel = require("../../models/Users.model");
const WorkspaceModel = require("../../models/Workspace.model");
const VerificationModel = require("../../models/WorkspaceSignupVerification.model");
const { createOtp, hashOtp, sendWorkspaceSignupOtp } = require("../../services/auth/workspaceSignupEmail");

const sendWorkspaceSignupOtpController = async (req, res) => {
  try {
    const { companyName, adminName, email } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!companyName?.trim() || !adminName?.trim() || !normalizedEmail) {
      return res.status(400).json({ success: false, message: "Company name, administrator name, and email are required." });
    }

    const [existingUser, existingWorkspace] = await Promise.all([
      UsersModel.findOne({ userEmail: normalizedEmail }),
      WorkspaceModel.findOne({ companyEmail: normalizedEmail }),
    ]);

    if (existingUser || existingWorkspace) {
      return res.status(409).json({ success: false, message: "This email is already registered." });
    }

    const otp = createOtp();
    await VerificationModel.findOneAndUpdate(
      { email: normalizedEmail },
      {
        companyName: companyName.trim(),
        adminName: adminName.trim(),
        email: normalizedEmail,
        otpHash: hashOtp(otp),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendWorkspaceSignupOtp(normalizedEmail, otp);
    return res.status(200).json({ success: true, message: "Verification code sent to your email." });
  } catch (error) {
    console.error("Workspace signup OTP error:", error);
    return res.status(500).json({ success: false, message: "Unable to send verification code." });
  }
};

module.exports = sendWorkspaceSignupOtpController;
