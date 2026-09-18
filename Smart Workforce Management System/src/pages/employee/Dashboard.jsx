import { useEffect, useState } from "react";
import { Spin, Tag, message } from "antd";
import { FaTasks, FaCheckCircle, FaClock, FaBell } from "react-icons/fa";
import api from "../../lib/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/task/getAll"), api.get("/notification/getAll")])
      .then(([taskResponse, notificationResponse]) => {
        setTasks(taskResponse.data.tasks || []);
        setNotifications(notificationResponse.data.notifications || []);
      })
      .catch((error) => message.error(error.response?.data?.message || "Unable to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex min-h-[400px] items-center justify-center"><Spin size="large" /></div>;
  }

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const pending = tasks.length - completed;

  const cards = [
    {
      title: "My Tasks",
      value: tasks.length,
      icon: <FaTasks />,
      color: "from-blue-600 to-cyan-500",
      iconColor: "text-blue-600",
      text: "All assigned work",
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      color: "from-emerald-600 to-green-500",
      iconColor: "text-emerald-600",
      text: "Finished tasks",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "from-amber-500 to-orange-500",
      iconColor: "text-orange-600",
      text: "Tasks needing attention",
    },
    {
      title: "Unread Notifications",
      value: notifications.filter((item) => !item.isRead).length,
      icon: <FaBell />,
      color: "from-violet-600 to-purple-500",
      iconColor: "text-purple-600",
      text: "Latest updates",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="mt-2 text-gray-500">Your assigned work and latest updates.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                  {card.value}
                </p>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ${card.iconColor} transition-transform group-hover:scale-105`}>
                {card.icon}
              </div>
            </div>
            <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
              {card.text}
            </p>
          </div>
      ))}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
          <p className="mt-1 text-sm text-gray-500">Your next assigned work</p>
        </div>
        <FaTasks className="text-xl text-blue-500" />
      </div>
      <div className="space-y-3">
        {tasks.filter((task) => task.status !== "Completed").slice(0, 5).map((task) => (
          <div key={task._id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div>
              <span className="font-medium text-gray-800">{task.taskName}</span>
              <p className="mt-1 text-xs text-gray-500">{task.projectId?.projectName || "No project"}</p>
            </div>
            <Tag color={task.status === "In Progress" ? "blue" : "gold"}>
              {task.status}
            </Tag>
          </div>
        ))}
          {!pending && <p className="text-sm text-gray-500">No pending tasks.</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
