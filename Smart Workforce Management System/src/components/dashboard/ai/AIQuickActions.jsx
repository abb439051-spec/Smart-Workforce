import {
  FaBrain,
  FaUsers,
  FaTasks,
  FaChartLine,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";

const actions = [
  {
    title: "Analyze Workforce",
    description: "Analyze employee productivity and workload.",
    icon: <FaUsers />,
    color: "bg-blue-500",
  },
  {
    title: "Balance Workload",
    description: "Redistribute overloaded employees.",
    icon: <FaBrain />,
    color: "bg-purple-500",
  },
  {
    title: "Predict Delays",
    description: "Identify projects likely to miss deadlines.",
    icon: <FaClock />,
    color: "bg-red-500",
  },
  {
    title: "Recommend Task Assignment",
    description: "Find the best employee for a task.",
    icon: <FaTasks />,
    color: "bg-green-500",
  },
  {
    title: "Forecast Productivity",
    description: "Predict future team performance.",
    icon: <FaChartLine />,
    color: "bg-orange-500",
  },
  {
    title: "Generate AI Report",
    description: "Create an executive workforce report.",
    icon: <FaFileAlt />,
    color: "bg-indigo-500",
  },
];

function AIQuickActions({ onActionSelect }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
          <p className="mt-1 text-sm text-gray-500">Start a live analysis using your workspace data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => onActionSelect(action.title)}
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
          >
            <div
              className={`${action.color} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl text-white transition-transform group-hover:scale-110`}
            >
              {action.icon}
            </div>

            <h3 className="text-sm font-semibold text-gray-800">
              {action.title}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AIQuickActions;