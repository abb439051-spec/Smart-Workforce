import {
  Table,
  Avatar,
  Tag,
  Space,
  Tooltip,
  Popconfirm,
  message,
} from "antd";

import api from "../../../lib/api";

import {
  EyeOutlined,
  EditOutlined,
  UserOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

function EmployeeTable({
  employees = [],
  refreshEmployees,
  onViewEmployee,
  onEditEmployee,
}) {

  const handleToggleStatus = async (employeeId) => {

    try {

      const response = await api.put(
        `/user/toggle-status/${employeeId}`,
        {}
      );

      message.success(response.data.message);

      await refreshEmployees?.();
      window.dispatchEvent(new Event("workforce:data-changed"));

    } catch (error) {

      message.error(
        error.response?.data?.message || "Operation failed"
      );

    }

  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      render: (text) => text || "N/A",
    },

    {
      title: "Employee",

      render: (_, record) => (

        <Space>

          <Avatar
            src={record.profileImage}
            icon={<UserOutlined />}
          />

          <div>

            <div className="font-medium">
              {record.name}
            </div>

            <div className="text-xs text-gray-500">
              {record.userEmail}
            </div>

          </div>

        </Space>

      ),
    },

    {
      title: "Department",
      render: (_, record) => {
        if (record.role === "manager") {
          return record.departments?.length
            ? record.departments.map((department) => (
                <div key={department._id}>
                  <div>{department.departmentName}</div>
                  <div className="text-xs text-gray-500">{department.departmentCode}</div>
                </div>
              ))
            : "Not assigned";
        }

        return record.departmentId ? (
          <div>
            <div>{record.departmentId.departmentName}</div>
            <div className="text-xs text-gray-500">{record.departmentId.departmentCode}</div>
          </div>
        ) : "-";
      },
    },

    {
      title: "Designation",
      dataIndex: "designation",
    },

    {
      title: "Role",

      dataIndex: "role",

      render: (role) => {

        let color = "green";

        if (role === "manager") color = "blue";
        if (role === "admin") color = "volcano";

        return (
          <Tag color={color}>
            {role.toUpperCase()}
          </Tag>
        );

      },
    },

    {
      title: "Capacity",

      render: (_, record) =>
        `${record.weeklyCapacity || 40} hrs`,
    },

    {
      title: "Status",

      render: (_, record) => (
        <div>
          <div className="font-medium">
            {record.currentWorkload || 0} / {record.weeklyCapacity || 40} hrs
          </div>
          <div className="text-xs text-gray-500">
            {record.capacityPercentage || 0}%
          </div>
        </div>
      ),
    },

    {
      title: "Workload",
      render: (_, record) => {

        let color = "green";

        switch (record.workloadCategory) {

          case "Moderate":color = "gold";
          break;
          case "Busy":color = "orange";
          break;
          case "Overloaded":color = "volcano";
          break;
          case "Critical":color = "red";
          break;
          default:color = "green";
        }

        return (
          <Tag color={color}>
            {record.workloadCategory || "Available"}
          </Tag>
        );
      },
    },

    {
      title: "Actions",

      render: (_, record) => (

        <Space>

          <Tooltip title="View">

            <span
              className="cursor-pointer text-blue-500"
              onClick={() => onViewEmployee(record)}
            >

              <EyeOutlined />

            </span>

          </Tooltip>

          <Tooltip title="Edit">

            <span
              className="cursor-pointer text-green-500"
              onClick={() => onEditEmployee(record)}
            >

              <EditOutlined />

            </span>

          </Tooltip>

          <Tooltip
            title={
              record.isActive
                ? "Deactivate Employee"
                : "Activate Employee"
            }
          >

            <Popconfirm
              title={
                record.isActive
                  ? "Deactivate Employee?"
                  : "Activate Employee?"
              }
              description={
                record.isActive
                  ? "Employee will no longer be able to log in."
                  : "Employee will regain access."
              }
              okText={
                record.isActive
                  ? "Deactivate"
                  : "Activate"
              }
              cancelText="Cancel"
              onConfirm={() =>
                handleToggleStatus(record._id)
              }
            >

              <span
                className={`cursor-pointer ${
                  record.isActive
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >

                {record.isActive ? (
                  <StopOutlined />
                ) : (
                  <CheckCircleOutlined />
                )}

              </span>

            </Popconfirm>

          </Tooltip>

        </Space>

      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-hidden">

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={employees}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 8,
        }}
      />

    </div>
  );
}

export default EmployeeTable;