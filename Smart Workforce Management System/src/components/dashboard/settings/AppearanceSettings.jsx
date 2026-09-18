import { Card, Radio, Switch } from "antd";
import {
  BgColorsOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

function AppearanceSettings() {
  return (
    <Card
      className="rounded-2xl shadow-sm border border-gray-200"
      bodyStyle={{ padding: "24px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl">
          <BgColorsOutlined />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Appearance
          </h2>

          <p className="text-gray-500 text-sm">
            Customize the application's appearance.
          </p>

        </div>

      </div>

      {/* Theme */}

      <div className="flex justify-between items-center py-5 border-b">

        <div>

          <h3 className="font-semibold text-gray-800">
            Theme
          </h3>

          <p className="text-gray-500 text-sm">
            Choose your preferred theme.
          </p>

        </div>

        <Radio.Group defaultValue="light">

          <Radio.Button value="light">
            Light
          </Radio.Button>

          <Radio.Button value="dark">
            Dark
          </Radio.Button>

          <Radio.Button value="system">
            System
          </Radio.Button>

        </Radio.Group>

      </div>

      {/* Dashboard Density */}

      <div className="flex justify-between items-center py-5 border-b">

        <div className="flex items-center gap-3">

          <AppstoreOutlined className="text-lg text-blue-600" />

          <div>

            <h3 className="font-semibold">
              Dashboard Density
            </h3>

            <p className="text-gray-500 text-sm">
              Choose spacing between dashboard elements.
            </p>

          </div>

        </div>

        <Radio.Group defaultValue="comfortable">

          <Radio.Button value="comfortable">
            Comfortable
          </Radio.Button>

          <Radio.Button value="compact">
            Compact
          </Radio.Button>

        </Radio.Group>

      </div>

      {/* Animations */}

      <div className="flex justify-between items-center pt-5">

        <div className="flex items-center gap-3">

          <ThunderboltOutlined className="text-lg text-yellow-500" />

          <div>

            <h3 className="font-semibold">
              Enable Animations
            </h3>

            <p className="text-gray-500 text-sm">
              Enable smooth transitions and effects.
            </p>

          </div>

        </div>

        <Switch defaultChecked />

      </div>

    </Card>
  );
}

export default AppearanceSettings;