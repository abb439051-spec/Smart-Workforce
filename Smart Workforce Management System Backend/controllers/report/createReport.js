const ReportModel = require("../../models/Reports.model");
const NotificationModel = require("../../models/Notifications.model");
const DepartmentModel = require("../../models/Department.model");
const { getAnalyticsDashboard } = require("../../services/analytics/analyticsService");

const createReport = async (req, res) => {
  try {
    const {
      name,
      type,
      departmentId,
      outputFormat = "word",
      prompt = "",
    } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Report name and type are required",
      });
    }

    let department = "All Departments";
    if (departmentId) {
      const selectedDepartment = await DepartmentModel.findOne({
        _id: departmentId,
        workspaceId: req.user.workspaceId,
        ...(req.user.role === "manager" ? { managerId: req.user._id } : {}),
      }).select("departmentName");

      if (!selectedDepartment) {
        return res.status(400).json({
          success: false,
          message: "Selected department is not valid.",
        });
      }

      department = selectedDepartment.departmentName;
    }

    if (!["word", "excel"].includes(outputFormat)) {
      return res.status(400).json({
        success: false,
        message: "Select Word or Excel format.",
      });
    }

    const analytics = await getAnalyticsDashboard(req.user.workspaceId);
    const report = await ReportModel.create({
      workspaceId: req.user.workspaceId,
      createdBy: req.user._id,
      report: name,
      type,
      department,
      outputFormat,
      prompt,
      aiScore: Math.round(analytics.cards.employeeProductivity || 0),
      summary: `Productivity is ${analytics.cards.employeeProductivity}%, with ${analytics.cards.pendingTasks} pending tasks and ${analytics.overloadAlerts.length} workload alerts.`,
    });

    await NotificationModel.create({
      workspaceId: req.user.workspaceId,
      userId: req.user._id,
      title: "Report generated",
      message: `"${name}" is ready to view.`,
      type: "System",
      priority: "Low",
    });

    return res.status(201).json({
      success: true,
      message: "Report generated successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to generate report",
    });
  }
};

module.exports = createReport;
