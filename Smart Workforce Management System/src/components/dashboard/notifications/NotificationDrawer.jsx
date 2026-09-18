import { Drawer, Tag, Button } from "antd";
import {
  FaClock,
} from "react-icons/fa";

function NotificationDrawer({
  open,
  onClose,
  notification,
  onMarkRead,
  onApproveRequest,
  onDeclineRequest,
}) {
  if (!notification) return null;

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isManagerApproval =
    notification.title === "Password reset approval required" &&
    ["manager", "admin"].includes(currentUser.role);

  const emailMatch = notification.message?.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const targetEmail = emailMatch ? emailMatch[0] : "";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      default:
        return "green";
    }
  };

  return (
    <Drawer
      title="Notification Details"
      open={open}
      onClose={onClose}
      width="min(500px, calc(100vw - 24px))"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">

        <h2 className="text-2xl font-bold">
          {notification.title}
        </h2>

        <div className="flex gap-3 mt-4">

          <Tag color="blue">
            {notification.type}
          </Tag>

          <Tag color={getPriorityColor(notification.priority)}>
            {notification.priority}
          </Tag>

        </div>

      </div>

      {/* Message */}
      <div className="bg-gray-50 rounded-xl p-5 mb-5">

        <h3 className="font-semibold mb-3">
          Notification
        </h3>

        <p className="text-gray-600">
          {notification.message}
        </p>

      </div>

      {/* Time */}
      <div className="flex items-center gap-3 mb-5">

        <FaClock className="text-blue-600" />

        <div>
          <p className="text-sm text-gray-500">
            Received
          </p>

          <p className="font-medium">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {isManagerApproval && (
        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="mb-3 font-semibold text-orange-700">Password reset approval</p>
          <div className="flex gap-3">
            <Button
              type="primary"
              danger
              onClick={() => onApproveRequest?.({ ...notification, email: targetEmail })}
            >
              Approve
            </Button>
            <Button onClick={() => onDeclineRequest?.({ ...notification, email: targetEmail })}>
              Decline
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <Button
          type="primary"
          block
          disabled={notification.isRead}
          onClick={() => onMarkRead(notification)}
        >
          {notification.isRead ? "Already Read" : "Mark as Read"}
        </Button>
      </div>

    </Drawer>
  );
}

export default NotificationDrawer;