import dayjs from "dayjs";
import {
  FaBell,
  FaExclamationTriangle,
  FaTasks,
} from "react-icons/fa";

function NotificationsList({ notifications = [], onViewNotification }) {
  const getNotificationStyle = (type) => {
    if (type === "Workload") {
      return {
        icon: <FaExclamationTriangle />,
        color: "bg-orange-500",
      };
    }

    if (type === "Task") {
      return {
        icon: <FaTasks />,
        color: "bg-blue-500",
      };
    }

    return {
      icon: <FaBell />,
      color: "bg-gray-500",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Recent Notifications
      </h2>

      <div className="space-y-5">

        {notifications.map((item) => {
          const style = getNotificationStyle(item.type);

          return (

          <div
            key={item._id}
            onClick={() => onViewNotification(item)}
            className="group cursor-pointer rounded-2xl border border-gray-200 p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
          >

            <div className="flex items-start gap-5">

              <div
                className={`${style.color} h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-md`}
              >
                {style.icon}
              </div>

              <div className="flex-1">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <span className="text-sm text-gray-400">
                    {dayjs(item.createdAt).format("DD MMM YYYY, HH:mm")}
                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  {item.message}
                </p>

                <div className="flex items-center gap-3 mt-4">

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                    {item.type}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : item.priority === "Medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.priority}
                  </span>

                  {!item.isRead && (
                    <span className="ml-auto h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
                  )}

                </div>

              </div>

            </div>

          </div>
          );
        })}

      </div>

    </div>
  );
}

export default NotificationsList;