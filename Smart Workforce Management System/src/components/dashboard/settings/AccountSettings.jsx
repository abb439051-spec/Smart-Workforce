import { Card, Tag } from "antd";
import {
  GlobalOutlined,
} from "@ant-design/icons";

function AccountSettings({ user }) {
  return (
    <Card className="h-full rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl">
          <GlobalOutlined />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Account
          </h2>

          <p className="text-gray-500 text-sm">
            Manage your account preferences and personal data.
          </p>

        </div>

      </div>

      <div className="flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="text-sm text-gray-500">Your account email address.</p>
        </div>
        <span className="font-medium text-gray-700">{user?.userEmail || "Not available"}</span>
      </div>

      <div className="flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Role</h3>
          <p className="text-sm text-gray-500">Permissions for this account.</p>
        </div>
        <Tag color="blue">{user?.role || "Unknown"}</Tag>
      </div>

      <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Account status</h3>
          <p className="text-sm text-gray-500">Current status from your account.</p>
        </div>
        <Tag color={user?.isActive === false ? "red" : "green"}>
          {user?.isActive === false ? "Inactive" : "Active"}
        </Tag>
      </div>

    </Card>
  );
}

export default AccountSettings;