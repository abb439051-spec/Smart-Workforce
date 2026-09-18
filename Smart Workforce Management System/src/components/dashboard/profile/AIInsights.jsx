import {
  FaRobot,
  FaChevronUp,
  FaLightbulb,
  FaExclamationTriangle,
} from "react-icons/fa";

function AIInsights({ analytics }) {
  const productivity = analytics?.cards?.employeeProductivity || 0;
  const overloadCount = analytics?.overloadAlerts?.length || 0;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl">
          <FaRobot />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            AI Productivity Insights
          </h2>

          <p className="text-sm text-gray-500">
            Personalized workforce analysis
          </p>
        </div>

      </div>

      <div className="space-y-5">

        <div className="flex gap-4 p-4 rounded-xl bg-green-50 border border-green-200">

          <div className="text-green-600 text-xl mt-1">
            <FaChevronUp />
          </div>

          <div>
            <h3 className="font-semibold text-green-700">
              Productivity Increased
            </h3>

            <p className="text-gray-600 mt-1">
              Current workspace productivity is
              <span className="font-semibold text-green-700"> {productivity}%</span>.
            </p>
          </div>

        </div>

        <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">

          <div className="text-blue-600 text-xl mt-1">
            <FaLightbulb />
          </div>

          <div>
            <h3 className="font-semibold text-blue-700">
              AI Recommendation
            </h3>

            <p className="text-gray-600 mt-1">
              Use current workload and productivity data to prioritize high-impact tasks.
            </p>
          </div>

        </div>

        <div className="flex gap-4 p-4 rounded-xl bg-orange-50 border border-orange-200">

          <div className="text-orange-600 text-xl mt-1">
            <FaExclamationTriangle />
          </div>

          <div>
            <h3 className="font-semibold text-orange-700">
              Workload Status
            </h3>

            <p className="text-gray-600 mt-1">
              {overloadCount
                ? `${overloadCount} overload alert${overloadCount === 1 ? "" : "s"} need attention.`
                : "No current overload alerts detected."}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">

        <p className="text-sm uppercase tracking-wider opacity-80">
          AI Confidence Score
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {productivity}%
        </h2>

        <p className="mt-2 text-sm opacity-90">
          Based on current workspace task completion data.
        </p>

      </div>

    </div>
  );
}

export default AIInsights;