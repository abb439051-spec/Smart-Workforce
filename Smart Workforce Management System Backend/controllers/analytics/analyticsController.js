const { getAnalyticsDashboard } = require("../../services/analytics/analyticsService");
const { generateAnalyticsInsights } = require("../../services/analytics/ai.service");

// 1. Controller for the standard dashboard data
const getAnalytics = async (req, res) => {
  try {
    const workspaceId = req.user.workspaceId;
    const analyticsData = await getAnalyticsDashboard(workspaceId, req.user);

    return res.status(200).json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error("Get Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
    });
  }
};

// 2. Controller for the AI-generated insights
const getAIInsights = async (req, res) => {
  try {
    const workspaceId = req.user.workspaceId;
    const analyticsData = await getAnalyticsDashboard(workspaceId, req.user);
    const aiData = await generateAnalyticsInsights(analyticsData);

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error) {
    console.error("AI Insights Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI insights",
    });
  }
};

module.exports = {
  getAnalytics,
  getAIInsights,
};
