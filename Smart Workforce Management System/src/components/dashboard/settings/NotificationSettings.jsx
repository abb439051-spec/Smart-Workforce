import { Card, Switch } from "antd";
import {
  BellOutlined,
  MailOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  RobotOutlined,
} from "@ant-design/icons";

const settings = [
  {
    title: "Email Notifications",
    description: "Receive important updates via email.",
    icon: <MailOutlined />,
    defaultValue: true,
  },
  {
    title: "In-App Notifications",
    description: "Show notifications inside the dashboard.",
    icon: <BellOutlined />,
    defaultValue: true,
  },
  {
    title: "Deadline Reminders",
    description: "Get reminded before project and task deadlines.",
    icon: <ClockCircleOutlined />,
    defaultValue: true,
  },
  {
    title: "AI Alerts",
    description: "Receive AI-generated productivity and workload alerts.",
    icon: <RobotOutlined />,
    defaultValue: true,
  },
  {
    title: "Project Updates",
    description: "Notify when project status or milestones change.",
    icon: <NotificationOutlined />,
    defaultValue: false,
  },
];

function NotificationSettings() {
  return (
    <Card
      className="rounded-2xl shadow-sm border border-gray-200"
      bodyStyle={{ padding: "24px" }}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
          <BellOutlined />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Notification Preferences
          </h2>

          <p className="text-gray-500 text-sm">
            Choose which notifications you want to receive.
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {settings.map((item) => (

          <div
            key={item.title}
            className="flex justify-between items-center pb-5 border-b last:border-none last:pb-0"
          >

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 text-lg">
                {item.icon}
              </div>

              <div>

                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>

              </div>

            </div>

            <Switch defaultChecked={item.defaultValue} />

          </div>

        ))}

      </div>

    </Card>
  );
}

export default NotificationSettings;