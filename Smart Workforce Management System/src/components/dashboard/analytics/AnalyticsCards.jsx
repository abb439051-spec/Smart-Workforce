import {
  FaUsers,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

function AnalyticsCards({ cards = {} }) {
  const stats = [
    {
      title: "Employee Productivity",
      value: `${cards.employeeProductivity || 0}%`,
      change: "Current productivity",
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Tasks Completed",
      value: cards.tasksCompleted || 0,
      change: "Completed tasks",
      icon: <FaTasks />,
      color: "bg-green-500",
    },
    {
      title: "Project Success",
      value: `${cards.projectSuccess || 0}%`,
      change: "Average project completion",
      icon: <FaChartLine />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {item.value}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {item.change}
              </p>
            </div>

            <div
              className={`${item.color} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl text-white`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;