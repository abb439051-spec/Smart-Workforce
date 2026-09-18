import {
  FaBell,
  FaRobot,
  FaTasks,
  FaExclamationTriangle,
} from "react-icons/fa";

const statsTemplate = [
  {
    title: "Total Notifications",
    value: 48,
    color: "from-blue-500 to-cyan-500",
    icon: <FaBell />,
  },
  {
    title: "AI Alerts",
    value: 12,
    color: "from-purple-500 to-indigo-500",
    icon: <FaRobot />,
  },
  {
    title: "Task Updates",
    value: 21,
    color: "from-green-500 to-emerald-500",
    icon: <FaTasks />,
  },
  {
    title: "High Priority",
    value: 5,
    color: "from-red-500 to-orange-500",
    icon: <FaExclamationTriangle />,
  },
];

function NotificationsCards({ notifications = [] }) {
  const stats = [
    { ...statsTemplate[0], value: notifications.length },
    { ...statsTemplate[1], value: notifications.filter((item) => item.type === "Workload").length },
    { ...statsTemplate[2], value: notifications.filter((item) => item.type === "Task").length },
    { ...statsTemplate[3], value: notifications.filter((item) => item.priority === "High").length },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

            <div
              className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-3xl`}
            >
              {item.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default NotificationsCards;