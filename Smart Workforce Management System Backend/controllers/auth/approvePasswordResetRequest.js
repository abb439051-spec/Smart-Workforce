const UsersModel = require("../../models/Users.model");
const DepartmentModel = require("../../models/Department.model");
const NotificationsModel = require("../../models/Notifications.model");
const PasswordResetVerification = require("../../models/PasswordResetVerification.model");

const approvePasswordResetRequest = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const approved = Boolean(req.body.approved);
    const reason = String(req.body.reason || "").trim();

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await UsersModel.findOne({ userEmail: email, workspaceId: req.user.workspaceId });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found." });
    }

    if (req.user.role === "admin") {
      if (user.workspaceId.toString() !== req.user.workspaceId.toString()) {
        return res.status(403).json({ success: false, message: "You are not authorized to approve this request." });
      }
    } else if (user.role === "employee") {
      const department = await DepartmentModel.findOne({
        _id: user.departmentId,
        workspaceId: req.user.workspaceId,
        managerId: req.user._id,
      });

      if (!department) {
        return res.status(403).json({ success: false, message: "You are not authorized to approve this request." });
      }
    } else {
      return res.status(403).json({ success: false, message: "Only a manager or administrator can approve this request." });
    }

    const verification = await PasswordResetVerification.findOne({
      email,
      requestedUserId: user._id,
      approvalStatus: "pending",
    }).sort({ createdAt: -1 });

    if (!verification) {
      return res.status(404).json({ success: false, message: "No pending reset approval was found for this user." });
    }

    if (!approved) {
      verification.approvalStatus = "declined";
      verification.approvedBy = req.user._id;
      verification.responseMessage = reason || `Declined by ${req.user.role}`;
      await verification.save();

      await NotificationsModel.create({
        workspaceId: req.user.workspaceId,
        userId: user._id,
        title: "Password reset declined",
        message: `Your password reset request was declined by a ${req.user.role}.${reason ? ` Reason: ${reason}` : ""}`,
        type: "System",
        priority: "High",
      });

      return res.status(200).json({ success: true, message: "Password reset request declined." });
    }

    verification.otpHash = "";
    verification.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    verification.approvalStatus = "approved";
    verification.approvedBy = req.user._id;
    verification.responseMessage = reason || `Approved by ${req.user.role}`;
    await verification.save();

    await NotificationsModel.create({
      workspaceId: req.user.workspaceId,
      userId: user._id,
      title: "Password reset approved",
      message: `Your password reset request was approved by a ${req.user.role}. You can now set a new password.`,
      type: "System",
      priority: "Medium",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset approved. The employee can now set a new password.",
    });
  } catch (error) {
    console.error("Approve password reset request error:", error);
    return res.status(500).json({ success: false, message: "Unable to process the approval." });
  }
};

module.exports = approvePasswordResetRequest;
