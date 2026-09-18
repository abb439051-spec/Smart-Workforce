import { Card, Switch, Radio } from "antd";
import {
  RobotOutlined,
  BulbOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const aiFeatures = [
  {
    title: "AI Assistant",
    description: "Enable the AI assistant throughout the application.",
    icon: <RobotOutlined />,
    defaultValue: true,
  },
  {
    title: "Smart Task Assignment",
    description: "Automatically recommend the best employee for each task.",
    icon: <ApartmentOutlined />,
    defaultValue: true,
  },
  {
    title: "Workload Recommendations",
    description: "Receive AI suggestions to balance employee workloads.",
    icon: <BulbOutlined />,
    defaultValue: true,
  },
  {
    title: "Delay Prediction",
    description: "Predict projects and tasks that are at risk of delays.",
    icon: <ClockCircleOutlined />,
    defaultValue: true,
  },
  {
    title: "Weekly AI Summary",
    description: "Generate a weekly workforce performance summary.",
    icon: <FileTextOutlined />,
    defaultValue: true,
  },
];

function AISettings() {
  return (
    <Card
      className="rounded-2xl shadow-sm border border-gray-200"
      bodyStyle={{ padding: 24 }}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl">
          <RobotOutlined />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            AI Preferences
          </h2>

          <p className="text-gray-500 text-sm">
            Configure how AI assists you while managing your workforce.
          </p>

        </div>

      </div>

      {/* AI Features */}

      <div className="space-y-6">

        {aiFeatures.map((feature) => (

          <div
            key={feature.title}
            className="flex justify-between items-center pb-5 border-b last:border-none last:pb-0"
          >

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-lg">
                {feature.icon}
              </div>

              <div>

                <h3 className="font-semibold text-gray-800">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {feature.description}
                </p>

              </div>

            </div>

            <Switch defaultChecked={feature.defaultValue} />

          </div>

        ))}

      </div>

      {/* Response Style */}

      <div className="mt-8 pt-6 border-t">

        <h3 className="font-semibold text-gray-800 mb-2">
          AI Response Style
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Choose how detailed AI responses should be.
        </p>

        <Radio.Group defaultValue="balanced">
          <Radio.Button value="brief">
            Brief
          </Radio.Button>

          <Radio.Button value="balanced">
            Balanced
          </Radio.Button>

          <Radio.Button value="detailed">
            Detailed
          </Radio.Button>
        </Radio.Group>

      </div>

    </Card>
  );
}

export default AISettings;