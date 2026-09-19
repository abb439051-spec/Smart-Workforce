import { Button, Avatar, Tag } from "antd";
import { EditOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

function ProfileHeader({ user, onEditProfile, onContactAdmin }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-sm md:p-8">
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-100/50" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="relative flex items-center gap-5 md:gap-6">

          <Avatar
            size={90}
            icon={<UserOutlined />}
            className="border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
          />

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {user.designation || "Administrator"}
            </p>

            <p className="text-gray-500">
              {user.role === "manager" && user.departments?.length
                ? user.departments.map((department) => department.departmentName).join(", ")
                : user.departmentId?.departmentName || "Workspace administrator"}
            </p>

            <p className="text-gray-500">
              {user.workspaceId?.companyName || "Company not provided"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <Tag color="green">
                Active
              </Tag>

              <Tag color="blue">
                Employee ID: {user.employeeId || "N/A"}
              </Tag>

            </div>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">
          {user.role === "manager" && (
            <Button size="large" icon={<MessageOutlined />} onClick={onContactAdmin}>Contact Admin</Button>
          )}
          <Button type="primary" size="large" icon={<EditOutlined />} onClick={onEditProfile}>Edit Profile</Button>
        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;