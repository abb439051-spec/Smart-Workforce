const ReportModel = require("../../models/Reports.model");

const deleteReport = async (req, res) => {
  try {
    const report = await ReportModel.findOneAndDelete({
      _id: req.params.id,
      workspaceId: req.user.workspaceId,
    });

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    return res.status(200).json({ success: true, message: "Report deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to delete report" });
  }
};

module.exports = deleteReport;
