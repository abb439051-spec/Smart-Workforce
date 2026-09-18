import {
  Table,
  Tag,
  Space,
  Tooltip,
  Progress,
  Avatar,
  Popconfirm,
  message,
} from "antd";

import api from "../../../lib/api";
import dayjs from "dayjs";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";

function TaskTable({
  tasks = [],
  refreshTasks,
  onViewTask,
  onEditTask,
}) {
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/task/delete/${taskId}`);

      message.success("Task deleted successfully.");

      window.dispatchEvent(new Event("workforce:data-changed"));
      await refreshTasks?.();
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "red";

      case "High":
        return "volcano";

      case "Medium":
        return "gold";

      case "Low":
        return "green";

      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";

      case "In Progress":
        return "blue";

      case "Review":
        return "orange";

      case "Todo":
        return "gold";

      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Task",
      render: (_, record) => (
        <Space>
          <Avatar icon={<CheckSquareOutlined />} />

          <div>
            <div className="font-medium">
              {record.taskName || "-"}
            </div>

            <div className="text-xs text-gray-500">
              {record.taskCode || "No task code"}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "Project",
      render: (_, record) =>
        record.projectId?.projectName || "-",
    },

    {
      title: "Assigned To",
      render: (_, record) => (
        <Space>
          <Avatar
            size="small"
            src={record.assignedTo?.profileImage}
            icon={<UserOutlined />}
          />

          <div>
            <div>
              {record.assignedTo?.name || "Unassigned"}
            </div>

            {record.assignedTo?.employeeId && (
              <div className="text-xs text-gray-500">
                {record.assignedTo.employeeId}
              </div>
            )}
          </div>
        </Space>
      ),
    },

    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority || "-"}
        </Tag>
      ),
    },

    {
      title: "Due Date",
      render: (_, record) =>
        record.dueDate
          ? dayjs(record.dueDate).format("DD MMM YYYY")
          : "-",
    },

    {
      title: "Progress",
      render: (_, record) => {
        const completion =
          record.completionPercentage ?? 0;

        return (
          <Progress
            percent={completion}
            size="small"
            status={
              completion === 100
                ? "success"
                : "active"
            }
          />
        );
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status || "-"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => onViewTask?.(record)}
            >
              <EyeOutlined />
            </span>
          </Tooltip>

          <Tooltip title="Edit">
            <span
              className="cursor-pointer text-green-500"
              onClick={() => onEditTask?.(record)}
            >
              <EditOutlined />
            </span>
          </Tooltip>

          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Task"
              description="This action cannot be undone."
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() =>
                handleDelete(record._id)
              }
            >
              <span className="cursor-pointer text-red-500">
                <DeleteOutlined />
              </span>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={tasks}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
        }}
        locale={{
          emptyText: "No tasks found",
        }}
      />
    </div>
  );
}

export default TaskTable;