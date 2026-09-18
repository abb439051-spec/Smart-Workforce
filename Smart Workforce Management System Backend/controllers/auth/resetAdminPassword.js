const bcrypt = require("bcryptjs");
const UsersModel = require("../../models/Users.model");
const PasswordResetVerification = require("../../models/PasswordResetVerification.model");
const { hashOtp } = require("../../services/auth/workspaceSignupEmail");

const resetAdminPassword = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const otp = String(req.body.otp || "");
    const password = String(req.body.password || "");

    if (!email || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email and a password of at least 6 characters.",
      });
    }

    const user = await UsersModel.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found." });
    }

    const verification = await PasswordResetVerification.findOne({
      email,
      requestedUserId: user._id,
      role: user.role,
    }).sort({ createdAt: -1 });
    if (!verification || verification.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "The reset request is invalid or expired." });
    }

    if (user.role === "employee") {
      if (
        verification.requestedUserId?.toString() !== user._id.toString() ||
        verification.approvalStatus !== "approved"
      ) {
        return res.status(403).json({
          success: false,
          message: "Manager or administrator approval is required before resetting this password.",
        });
      }

      user.password = await bcrypt.hash(password, 10);
      await user.save();
      await PasswordResetVerification.deleteOne({ _id: verification._id });
      return res.status(200).json({ success: true, message: "Password reset successfully." });
    }

    if (user.role === "manager") {
      if (verification.approvalStatus !== "approved") {
        return res.status(403).json({
          success: false,
          message: "Administrator approval is required before resetting this password.",
        });
      }

      user.password = await bcrypt.hash(password, 10);
      await user.save();
      await PasswordResetVerification.deleteOne({ _id: verification._id });
      return res.status(200).json({ success: true, message: "Password reset successfully." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Password reset is not available for this account.",
      });
    }

    if (verification.role !== "admin" || verification.approvalStatus !== "approved") {
      return res.status(400).json({
        success: false,
        message: "A valid admin password reset request is required.",
      });
    }

    if (!verification.otpVerified) {
      return res.status(400).json({
        success: false,
        message: "The email OTP must be verified before setting a new password.",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();
    await PasswordResetVerification.deleteOne({ _id: verification._id });

    return res.status(200).json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Unable to reset password" });
  }
};

module.exports = resetAdminPassword;
