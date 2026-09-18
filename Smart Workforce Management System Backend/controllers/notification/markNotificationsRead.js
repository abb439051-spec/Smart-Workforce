const NotificationModel = require("../../models/Notifications.model");

const markNotificationsRead = async (req, res) => {
  try {
    await NotificationModel.updateMany(
      {
        workspaceId: req.user.workspaceId,
        userId: req.user._id,
        isRead: false,
      },
      { isRead: true }
    );

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update notifications",
    });
  }
};

module.exports = markNotificationsRead;
