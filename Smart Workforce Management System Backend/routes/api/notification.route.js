const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const getNotifications = require("../../controllers/notification/getNotifications");
const markNotificationsRead = require("../../controllers/notification/markNotificationsRead");
const markNotificationRead = require("../../controllers/notification/markNotificationRead");
const sendManagerMessage = require("../../controllers/notification/sendManagerMessage");

router.get("/getAll", authMiddleware, getNotifications);
router.put("/mark-all-read", authMiddleware, markNotificationsRead);
router.put("/:id/read", authMiddleware, markNotificationRead);
router.post("/manager-message", authMiddleware, sendManagerMessage);

module.exports = router;
