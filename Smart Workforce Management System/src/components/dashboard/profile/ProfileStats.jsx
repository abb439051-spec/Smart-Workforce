import {
  FaChartLine,
  FaTasks,
  FaTrophy,
  FaRobot,
} from "react-icons/fa";

const buildStats = (analytics) => {
  const cards = analytics?.cards || {};
  return [
  {
    title: "Performance Score",
    value: `${cards.employeeProductivity || 0}%`,
    trend: "Live",
    description: "Average workforce productivity",
    icon: <FaChartLine />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Tasks Completed",
    value: cards.tasksCompleted || 0,
    trend: "Live",
    description: "Completed tasks in the workspace",
    icon: <FaTasks />,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Achievement Score",
    value: cards.projectSuccess || 0,
    trend: "Live",
    description: "Projects currently successful",
    icon: <FaTrophy />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "AI Productivity",
    value: analytics ? `${analytics.overloadAlerts?.length || 0}` : "0",
    trend: "Live",
    description: "Current overload alerts",
    icon: <FaRobot />,
    color: "from-orange-500 to-red-500",
  },
  ];
};

function ProfileStats({ analytics }) {
  const stats = buildStats(analytics);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((card) => (

        <div
          key={card.title}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >

          {/* Background Glow */}
          <div
            className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-all`}
          />

          <div className="relative flex justify-between items-start">

            <div>

              <p className="text-sm text-gray-500 font-medium">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                {card.value}
              </h2>

              <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                ↑ {card.trend}
              </span>

            </div>

            <div
              className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-3xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}
            >
              {card.icon}
            </div>

          </div>

          <p className="mt-6 text-sm text-gray-500">
            {card.description}
          </p>

        </div>

      ))}

    </div>
  );
}

export default ProfileStats;