import { Drawer, Tag, Progress } from "antd";
import { FaRobot, FaChartLine } from "react-icons/fa";

function ReportDrawer({ open, onClose, report }) {
  if (!report) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Generated":
        return "green";
      case "Processing":
        return "gold";
      case "Failed":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Drawer
      title="AI Report Analysis"
      open={open}
      onClose={onClose}
      width="min(500px, calc(100vw - 24px))"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">

        <h2 className="text-2xl font-bold">
          {report.report}
        </h2>

        <div className="flex gap-3 mt-4">

          <Tag color={getStatusColor(report.status)}>
            {report.status}
          </Tag>

          <Tag color="blue">
            {report.department}
          </Tag>

          <Tag color="purple">
            {report.type}
          </Tag>

        </div>

      </div>

      {/* AI Score */}

      <div className="bg-white border rounded-2xl p-5 mb-5 shadow-sm">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <FaRobot className="text-blue-600 text-xl" />

            <h3 className="font-semibold">
              AI Confidence Score
            </h3>
          </div>

          <span className="text-2xl font-bold text-blue-600">
            {report.aiScore}%
          </span>

        </div>

        <Progress
          percent={report.aiScore}
          showInfo={false}
          strokeColor="#2563eb"
          className="mt-4"
        />

      </div>

      {/* AI Summary */}

      <div className="bg-blue-50 rounded-xl p-5 mb-5">

        <div className="flex items-center gap-3 mb-3">
          <FaChartLine className="text-blue-600" />

          <h3 className="font-semibold">
            AI Summary
          </h3>
        </div>

        <p className="text-gray-600">
          {report.summary || "This report was generated from current workforce data."}
        </p>

      </div>

      <div className="rounded-xl bg-slate-50 p-5 text-sm text-gray-600">
        This report reflects the workspace analytics available when it was generated.
      </div>

    </Drawer>
  );
}

export default ReportDrawer;