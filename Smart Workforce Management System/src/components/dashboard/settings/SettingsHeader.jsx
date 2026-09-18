import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

function SettingsHeader({ onSave }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your application preferences, AI features and account settings.
        </p>

      </div>

      <Button
        type="primary"
        size="large"
        icon={<SaveOutlined />}
        onClick={onSave}
      >
        Save Changes
      </Button>

    </div>
  );
}

export default SettingsHeader;