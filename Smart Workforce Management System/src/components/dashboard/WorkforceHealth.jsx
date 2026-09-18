import { Alert, Progress, Tag } from "antd";

function WorkforceHealth({
  overloadAlerts = [],
  productivity = 0,
  burnoutRisk = 0,
  workloadBalance = 100,
  workloadRecommendations = [],
  delayPredictions = [],
}) {
  const healthData = [
    {
      title: "Productivity",
      percent: productivity,
    },
    {
      title: "Workload Balance",
      percent: workloadBalance,
    },
    {
      title: "Burnout Risk",
      percent: burnoutRisk,
    },
  ];

  // Returns progress bar color
  const getColor = (title, percent) => {
    if (title === "Burnout Risk") {
      if (percent <= 25) return "#22c55e"; // Green
      if (percent <= 50) return "#f59e0b"; // Orange
      return "#ef4444"; // Red
    }

    if (percent >= 90) return "#22c55e"; // Green
    if (percent >= 75) return "#2563eb"; // Blue
    if (percent >= 50) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  // Returns status text
  const getStatus = (title, percent) => {
    if (title === "Burnout Risk") {
      if (percent <= 25)
        return { text: "Low Risk", color: "success" };

      if (percent <= 50)
        return { text: "Moderate Risk", color: "warning" };

      return { text: "High Risk", color: "error" };
    }

    if (percent >= 90)
      return { text: "Excellent", color: "success" };

    if (percent >= 75)
      return { text: "Good", color: "processing" };

    if (percent >= 50)
      return { text: "Average", color: "warning" };

    return { text: "Poor", color: "error" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">
        Workforce Health Score
      </h2>

      {overloadAlerts.length > 0 && (
        <Alert
          className="mb-6"
          type="warning"
          showIcon
          message={`${overloadAlerts.length} employee${overloadAlerts.length === 1 ? "" : "s"} need workload attention`}
          description={overloadAlerts
            .map(
              (employee) =>
                `${employee.name}: ${employee.capacityPercentage}% (${employee.category})`
            )
            .join(", ")}
        />
      )}
      {workloadRecommendations.length > 0 && (
        <Alert
          className="mb-6"
          type="info"
          showIcon
          message={workloadRecommendations[0].action}
          description={workloadRecommendations[0].details}
        />
      )}
      {delayPredictions.length > 0 && (
        <Alert
          className="mb-6"
          type="error"
          showIcon
          message={`${delayPredictions.length} task${delayPredictions.length === 1 ? "" : "s"} may be delayed`}
          description={delayPredictions
            .slice(0, 3)
            .map((task) => `"${task.taskName}" (${task.assignedTo}) - ${task.reason}`)
            .join(" ")}
        />
      )}

      <div className="space-y-6">
        {healthData.map((item) => {
          const status = getStatus(item.title, item.percent);

          return (
            <div key={item.title}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {item.title}
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800">
                    {item.percent}%
                  </span>

                  <Tag color={status.color}>
                    {status.text}
                  </Tag>
                </div>
              </div>

              <Progress
                percent={item.percent}
                showInfo={false}
                strokeColor={getColor(item.title, item.percent)}
                strokeWidth={12}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkforceHealth;