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
  ProjectOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

function ProjectTable({
  projects,
  refreshProjects,
  onViewProject,
  onEditProject,
}) {

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/project/delete/${projectId}`);

      message.success("Project deleted successfully.");

      await refreshProjects();

    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const handleToggleStatus = async (projectId) => {
    try {
      const response = await api.put(
        `/project/toggle-status/${projectId}`,
        {}
      );

      message.success(response.data.message);

      await refreshProjects();

    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to update project status."
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "gold";

      case "Active":
        return "blue";

      case "On Hold":
        return "orange";

      case "Completed":
        return "green";

      default:
        return "default";
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

  const columns = [

    {
      title: "Project",

      render: (_, record) => (
        <Space>

          <Avatar
            icon={<ProjectOutlined />}
          />

          <div>

            <div className="font-medium">
              {record.projectName}
            </div>

            <div className="text-xs text-gray-500">
              {record.projectCode || "-"}
            </div>

          </div>

        </Space>
      ),
    },

    {
      title: "Department",

      render: (_, record) =>
        record.departmentId
          ? record.departmentId.departmentName
          : "-",
    },

    {
      title: "Manager",

      render: (_, record) =>
        record.managerId
          ? record.managerId.name
          : "-",
    },

    {
      title: "Estimated",

      render: (_, record) =>
        `${record.estimatedHours || 0} hrs`,
    },

    {
      title: "Progress",

      render: (_, record) => (
        <Progress
          percent={record.completionPercentage || 0}
          size="small"
          status={
            record.completionPercentage === 100
              ? "success"
              : "active"
          }
        />
      ),
    },

    {
      title: "Priority",

      render: (_, record) => (
        <Tag color={getPriorityColor(record.priority)}>
          {record.priority}
        </Tag>
      ),
    },

    {
      title: "End Date",

      render: (_, record) =>
        record.endDate
          ? dayjs(record.endDate).format("DD MMM YYYY")
          : "-",
    },

    {
      title: "Status",

      render: (_, record) => (
        <Space direction="vertical" size={2}>

          <Tag color={getStatusColor(record.status)}>
            {record.status}
          </Tag>

          <Tag
            color={
              record.isActive
                ? "green"
                : "red"
            }
          >
            {record.isActive
              ? "Active"
              : "Archived"}
          </Tag>

        </Space>
      ),
    },

    {
      title: "Actions",

      render: (_, record) => (
        <Space>

          {/* View */}

          <Tooltip title="View">

            <span
              className="cursor-pointer text-blue-500"
              onClick={() =>
                onViewProject(record)
              }
            >
              <EyeOutlined />
            </span>

          </Tooltip>

          {/* Edit */}

          <Tooltip title="Edit">

            <span
              className="cursor-pointer text-green-500"
              onClick={() =>
                onEditProject(record)
              }
            >
              <EditOutlined />
            </span>

          </Tooltip>

          {/* Archive / Restore */}

          <Tooltip
            title={
              record.isActive
                ? "Archive Project"
                : "Restore Project"
            }
          >

            <Popconfirm
              title={
                record.isActive
                  ? "Archive Project?"
                  : "Restore Project?"
              }

              description={
                record.isActive
                  ? "This project will be archived and won't be available for new tasks."
                  : "This project will be restored and become active again."
              }

              okText={
                record.isActive
                  ? "Archive"
                  : "Restore"
              }

              cancelText="Cancel"

              onConfirm={() =>
                handleToggleStatus(
                  record._id
                )
              }
            >

              <span
                className={
                  record.isActive
                    ? "cursor-pointer text-orange-500"
                    : "cursor-pointer text-green-500"
                }
              >

                {record.isActive ? (
                  <StopOutlined />
                ) : (
                  <CheckCircleOutlined />
                )}

              </span>

            </Popconfirm>

          </Tooltip>

          {/* Delete */}

          <Tooltip title="Delete">

            <Popconfirm
              title="Delete Project"
              description="This action cannot be undone."
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{
                danger: true,
              }}
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={projects}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 8,
        }}
      />

    </div>
  );
}

export default ProjectTable;