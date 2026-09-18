const UsersModel = require("../../models/Users.model");
const PasswordResetVerification = require("../../models/PasswordResetVerification.model");
const { hashOtp } = require("../../services/auth/workspaceSignupEmail");

const verifyPasswordResetOtp = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const otp = String(req.body.otp || "");

    if (!email || !/^[0-9]{6}$/.test(otp)) {
      return res.status(400).json({ success: false, message: "Enter the 6-digit email OTP." });
    }

    const user = await UsersModel.findOne({ userEmail: email, role: "admin" });
    if (!user) {
      return res.status(404).json({ success: false, message: "Admin account not found." });
    }

    const verification = await PasswordResetVerification.findOne({
      email,
      requestedUserId: user._id,
      role: "admin",
      approvalStatus: "approved",
    }).sort({ createdAt: -1 });

    if (!verification || verification.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "The reset request is invalid or expired." });
    }

    if (verification.otpHash !== hashOtp(otp)) {
      return res.status(400).json({ success: false, message: "The OTP is invalid." });
    }

    verification.otpVerified = true;
    await verification.save();

    return res.status(200).json({ success: true, message: "Email OTP verified. You can now choose a new password." });
  } catch (error) {
    console.error("Verify password reset OTP error:", error);
    return res.status(500).json({ success: false, message: "Unable to verify the email OTP." });
  }
};

module.exports = verifyPasswordResetOtp;
