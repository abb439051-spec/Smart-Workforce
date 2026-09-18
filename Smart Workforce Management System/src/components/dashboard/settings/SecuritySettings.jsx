import { Card, Button, Switch } from "antd";
import {
  LockOutlined,
  SafetyCertificateOutlined,
  LaptopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function SecuritySettings({ onChangePassword }) {
  return (
    <Card
      className="rounded-2xl shadow-sm border border-gray-200"
      bodyStyle={{ padding: 24 }}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl">
          <SafetyCertificateOutlined />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Security
          </h2>

          <p className="text-gray-500 text-sm">
            Protect your account and manage security preferences.
          </p>

        </div>

      </div>

      {/* Change Password */}

      <div className="flex justify-between items-center py-5 border-b">

        <div className="flex gap-4">

          <LockOutlined className="text-xl text-blue-600 mt-1" />

          <div>

            <h3 className="font-semibold">
              Change Password
            </h3>

            <p className="text-sm text-gray-500">
              Update your password regularly to keep your account secure.
            </p>

          </div>

        </div>

        <Button
          type="primary"
          onClick={onChangePassword}
        >
          Change
        </Button>

      </div>

      {/* Two Factor */}

      <div className="flex justify-between items-center py-5 border-b">

        <div className="flex gap-4">

          <SafetyCertificateOutlined className="text-xl text-purple-600 mt-1" />

          <div>

            <h3 className="font-semibold">
              Two-Factor Authentication
            </h3>

            <p className="text-sm text-gray-500">
              Add an extra layer of protection to your account.
            </p>

          </div>

        </div>

        <Switch defaultChecked />

      </div>

      {/* Active Sessions */}

      <div className="flex justify-between items-center py-5 border-b">

        <div className="flex gap-4">

          <LaptopOutlined className="text-xl text-orange-500 mt-1" />

          <div>

            <h3 className="font-semibold">
              Active Sessions
            </h3>

            <p className="text-sm text-gray-500">
              You are currently logged in on 2 devices.
            </p>

          </div>

        </div>

        <Button>
          View
        </Button>

      </div>

      {/* Logout */}

      <div className="flex justify-between items-center pt-5">

        <div className="flex gap-4">

          <LogoutOutlined className="text-xl text-red-500 mt-1" />

          <div>

            <h3 className="font-semibold">
              Logout All Devices
            </h3>

            <p className="text-sm text-gray-500">
              Sign out from every device except this one.
            </p>

          </div>

        </div>

        <Button danger>
          Logout
        </Button>

      </div>

    </Card>
  );
}

export default SecuritySettings;