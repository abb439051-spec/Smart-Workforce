const express = require("express");
const { getAnalytics, getAIInsights } = require("../../controllers/analytics/analyticsController");

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, roleMiddleware("admin", "manager"), getAnalytics);
router.get("/ai-insights", authMiddleware, getAIInsights);

module.exports = router;
