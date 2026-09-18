const NotificationModel = require("../../models/Notifications.model");

const markNotificationRead = async (req, res) => {
  try {
    const notification = await NotificationModel.findOneAndUpdate(
      {
        _id: req.params.id,
        workspaceId: req.user.workspaceId,
        userId: req.user._id,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update notification",
    });
  }
};

module.exports = markNotificationRead;
