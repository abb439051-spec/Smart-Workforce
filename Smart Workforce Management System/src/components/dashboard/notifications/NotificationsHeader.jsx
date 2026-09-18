import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

function NotificationsHeader({ onMarkAllRead }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Notifications
        </h1>

        <p className="text-gray-500 mt-1">
          Stay updated with AI insights, task reminders, and workforce activities.
        </p>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<CheckCircleOutlined />}
        onClick={onMarkAllRead}
      >
        Mark All as Read
      </Button>

    </div>
  );
}

export default NotificationsHeader;