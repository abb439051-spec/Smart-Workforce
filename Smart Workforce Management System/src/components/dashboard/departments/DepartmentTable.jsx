import { Table, Avatar, Tag, Space, Tooltip, Popconfirm, message } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import api from "../../../lib/api";

function DepartmentTable({ departments, onViewDepartment, onEditDepartment, refreshDepartments}) {
  const handleDelete = async (departmentId) => {
    try {
      await api.delete(`/department/delete/${departmentId}`);
      message.success("Department deleted successfully");
      refreshDepartments();
    } 
    catch (error) {
      message.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };
const columns = [
  {
    title: "Department",
    render: (_, record) => (
      <div>
        <div className="font-medium">{record.departmentName}</div>
        <div className="text-xs text-gray-500">{record.departmentCode}</div>
      </div>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Manager",
    render: (_, record) => (
      record.managerId ? (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{record.managerId.name}</span>
        </Space>
      ) : (
        <Tag color="default">Not Assigned</Tag>
      )
    ),
  },
  {
    title: "Actions",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="View">
          <span
            className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => onViewDepartment(record)}
          >
            <EyeOutlined />
          </span>
        </Tooltip>

        <Tooltip title="Edit">
          <span className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors"
          onClick = {() => onEditDepartment(record)}
          >
            <EditOutlined />
          </span>
        </Tooltip>

        <Tooltip title="Delete">
          <Popconfirm
          title="Delete Department"
          description="Are you sure you want to delete this department?"
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDelete(record._id)}
          >
            <span className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
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
        columns={columns}
        dataSource={departments}
        scroll={{ x: "max-content" }}
        rowKey= "_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default DepartmentTable;