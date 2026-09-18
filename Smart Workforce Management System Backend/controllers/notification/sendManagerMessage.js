const UsersModel = require("../../models/Users.model");
const NotificationsModel = require("../../models/Notifications.model");

const sendManagerMessage = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ success: false, message: "Only managers can send admin messages." });
    }

    const subject = String(req.body.subject || "").trim();
    const message = String(req.body.message || "").trim();
    if (!subject || !message) {
      return res.status(400).json({ success: false, message: "Subject and message are required." });
    }
    if (subject.length > 120 || message.length > 2000) {
      return res.status(400).json({ success: false, message: "Message is too long." });
    }

    const admins = await UsersModel.find({
      workspaceId: req.user.workspaceId,
      role: "admin",
      isActive: true,
    }).select("_id");

    if (!admins.length) {
      return res.status(404).json({ success: false, message: "No active administrator is available." });
    }

    await NotificationsModel.insertMany(
      admins.map((admin) => ({
        workspaceId: req.user.workspaceId,
        userId: admin._id,
        title: `Message from manager: ${subject}`,
        message: `${req.user.name}: ${message}`,
        type: "System",
        priority: "Medium",
      }))
    );

    return res.status(201).json({ success: true, message: "Your message was sent to the administrator." });
  } catch (error) {
    console.error("Send manager message error:", error);
    return res.status(500).json({ success: false, message: "Unable to send message." });
  }
};

module.exports = sendManagerMessage;
