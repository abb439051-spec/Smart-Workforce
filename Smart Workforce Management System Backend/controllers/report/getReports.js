const ReportModel = require("../../models/Reports.model");

const getReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({
      workspaceId: req.user.workspaceId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, reports });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to load reports",
    });
  }
};

module.exports = getReports;
