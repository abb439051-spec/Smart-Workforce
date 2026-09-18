const NotificationModel = require("../../models/Notifications.model");

const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      workspaceId: req.user.workspaceId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to load notifications",
    });
  }
};

module.exports = getNotifications;
