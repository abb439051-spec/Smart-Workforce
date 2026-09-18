import { Table, Tag, Space, Tooltip, message } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../../../lib/api";

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

function ReportsTable({ reports = [], refreshReports, onViewReport }) {
  const downloadReport = (record) => {
    const safeName = record.report.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const rows = [
      ["Report", record.report],
      ["Department", record.department],
      ["Type", record.type],
      ["AI Score", `${record.aiScore}%`],
      ["Status", record.status],
      ["Generated", dayjs(record.createdAt).format("DD MMM YYYY")],
      ["Prompt", record.prompt || ""],
      ["Summary", record.summary || ""],
    ];

    if (record.outputFormat === "excel") {
      const csv = rows
        .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n");
      const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${safeName}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const html = `
      <html><body>
        <h1>${record.report}</h1>
        ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join("")}
      </body></html>`;
    const file = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: "Report",
      dataIndex: "report",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <Tag color="blue">
          {type}
        </Tag>
      ),
    },
    {
      title: "Format",
      dataIndex: "outputFormat",
      render: (format) => (
        <Tag color={format === "excel" ? "green" : "geekblue"}>
          {format === "excel" ? "Excel" : "Word"}
        </Tag>
      ),
    },
    {
      title: "Generated",
      render: (_, record) =>
        dayjs(record.createdAt).format("DD MMM YYYY"),
    },
    {
      title: "AI Score",
      dataIndex: "aiScore",
      render: (score) => (
        <Tag color={score >= 90 ? "green" : score >= 75 ? "gold" : "red"}>
          {score}%
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">

          <Tooltip title="View Report">
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => onViewReport(record)}
            >
              <EyeOutlined />
            </span>
          </Tooltip>

          <Tooltip title="Download">
            <span
              className="cursor-pointer text-green-600 hover:text-green-800 transition-colors"
              onClick={() => downloadReport(record)}
            >
              <DownloadOutlined />
            </span>
          </Tooltip>

          <Tooltip title="Delete">
            <span
              className="cursor-pointer text-red-600 hover:text-red-800 transition-colors"
              onClick={async () => {
                try {
                  await api.delete(`/report/delete/${record._id}`);
                  await refreshReports();
                  message.success("Report deleted");
                } catch (error) {
                  message.error(
                    error.response?.data?.message || "Unable to delete report"
                  );
                }
              }}
            >
              <DeleteOutlined />
            </span>
          </Tooltip>

        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <Table
        columns={columns}
        dataSource={reports}
        scroll={{ x: "max-content" }}
        rowKey="_id"
        locale={{
          emptyText: "No reports generated yet. Use Generate Report to create one.",
        }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ReportsTable;