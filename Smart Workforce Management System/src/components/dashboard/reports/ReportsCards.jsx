import {
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";

const reportStatsTemplate = [
  {
    title: "Overall Productivity",
    value: 92,
    icon: <FaChartLine />,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    title: "Workforce Utilization",
    value: 87,
    icon: <FaUsers />,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Project Success",
    value: 94,
    icon: <FaCheckCircle />,
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-50",
  },
  {
    title: "AI Health Score",
    value: 96,
    icon: <FaRobot />,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
  },
];

function ReportsCards({ analytics }) {
  const reportStats = [
    { ...reportStatsTemplate[0], value: analytics.cards.employeeProductivity },
    { ...reportStatsTemplate[1], value: analytics.employeeWorkloads.length
      ? Math.round(analytics.employeeWorkloads.reduce((sum, item) => sum + item.capacityPercentage, 0) / analytics.employeeWorkloads.length)
      : 0 },
    { ...reportStatsTemplate[2], value: analytics.cards.projectSuccess },
    { ...reportStatsTemplate[3], value: Math.max(
      0,
      100 - analytics.overloadAlerts.length * 10
    ) },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {reportStats.map((card) => (
        <div
          key={card.title}
          // 1. flex layout settings to distribute available interior space
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
        >
          {/* Background Glow */}
          <div
            className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-all`}
          />

          {/* 2. Top Group Wrapper: Isolates metrics text from stretching out */}
          <div>
            <div className="relative flex items-start justify-between">
              <div>
                <div className="min-h-[3.2rem] flex items-center">
                  <p className="text-sm font-medium text-gray-500 leading-snug">
                    {card.title}
                  </p>
                </div>

                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  {card.value}%
                </h2>

              </div>

              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-3xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}
              >
                {card.icon}
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 mb-6">
              Calculated from current workspace data
            </p>
          </div>

          {/* 3. Bottom Group: The progress container remains anchored here */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Performance</span>
              <span>{card.value}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                style={{
                  width: `${card.value}%`,
                }}
              />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default ReportsCards;
