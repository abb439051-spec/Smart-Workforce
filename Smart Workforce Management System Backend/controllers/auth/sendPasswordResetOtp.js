const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");
const NotificationsModel = require("../../models/Notifications.model");
const PasswordResetVerification = require("../../models/PasswordResetVerification.model");
const {
  createOtp,
  hashOtp,
  sendPasswordResetOtp,
} = require("../../services/auth/workspaceSignupEmail");

const sendPasswordResetOtpController = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await UsersModel.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account was found for this email.",
      });
    }

    if (user.role === "employee" || user.role === "manager") {
      const existingVerification = await PasswordResetVerification.findOne({
        email,
        requestedUserId: user._id,
      }).sort({ createdAt: -1 });

      if (existingVerification && existingVerification.expiresAt > new Date()) {
        if (existingVerification.approvalStatus === "approved") {
          return res.status(200).json({
            success: true,
            canResetNow: true,
            requiresOtp: false,
            message: "Your request is approved. You can now choose a new password.",
          });
        }

        if (existingVerification.approvalStatus === "pending") {
          return res.status(200).json({
            success: true,
            requestPending: true,
            message: "Your password reset request is waiting for manager or admin approval.",
          });
        }
      }

      const department = user.role === "employee"
        ? await DepartmentModel.findOne({
            _id: user.departmentId,
            workspaceId: user.workspaceId,
          }).lean()
        : null;
      const managers = department?.managerId
        ? await UsersModel.find({ _id: department.managerId, role: "manager" }).lean()
        : [];
      const admins = await UsersModel.find({
        workspaceId: user.workspaceId,
        role: "admin",
      }).lean();
      const approvers = user.role === "employee" ? [...managers, ...admins] : admins;

      await PasswordResetVerification.findOneAndUpdate(
        { email, requestedUserId: user._id },
        {
          email,
          role: user.role,
          otpHash: "",
          otpVerified: false,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          requestedUserId: user._id,
          managerId: department?.managerId || null,
          approvalStatus: "pending",
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      await Promise.all(approvers.map((approver) =>
        NotificationsModel.create({
          workspaceId: user.workspaceId,
          userId: approver._id,
          title: "Password reset approval required",
          message: `${user.name} (${user.userEmail}) requested permission to reset their password.`,
          type: "System",
          priority: "High",
        })
      ));

      return res.status(200).json({
        success: true,
        requestPending: true,
        message: user.role === "manager"
          ? "Your request was sent to the workspace administrators for approval."
          : "Your request was sent to your manager and administrator for approval.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Password reset is not available for this account." });
    }

    const otp = createOtp();
    await PasswordResetVerification.findOneAndUpdate(
      { email },
      {
      email,
      role: "admin",
      otpHash: hashOtp(otp),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      requestedUserId: user._id,
      approvalStatus: "approved",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendPasswordResetOtp(email, otp);

    return res.status(200).json({
      success: true,
      requiresOtp: true,
      message: "A password reset code has been sent to your email.",
    });
  } catch (error) {
    console.error("Send password reset OTP error:", error);
    return res.status(500).json({ success: false, message: "Unable to send password reset code" });
  }
};

module.exports = sendPasswordResetOtpController;
