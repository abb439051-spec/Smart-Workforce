import { Card, Progress, Tag } from "antd";

function AIResultCard({ analytics }) {
  const cards = analytics?.cards || {};
  const metrics = [
    { label: "Productivity", value: Number(cards.employeeProductivity || 0), percent: true },
    { label: "Project success", value: Number(cards.projectSuccess || 0), percent: true },
    { label: "Tasks completed", value: Number(cards.tasksCompleted || 0), percent: false },
    { label: "Overload alerts", value: analytics?.overloadAlerts?.length || 0, percent: false },
  ];
  const productivity = Number(cards.employeeProductivity || 0);

  return (
    <Card
      title={<span className="font-semibold text-gray-800">Live Workforce Snapshot</span>}
      className="rounded-3xl border-gray-200 shadow-sm"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Current workspace metrics</h3>
            <p className="mt-1 text-xs text-gray-500">Updated from live analytics.</p>
          </div>
          <Tag color="blue">Live</Tag>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-gray-100 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-gray-600">{metric.label}</span>
              <span className="font-semibold text-gray-800">{metric.value}{metric.percent ? "%" : ""}</span>
              </div>
              {metric.percent && <Progress percent={metric.value} showInfo={false} strokeColor="#2563eb" />}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
          <p className="text-xs uppercase tracking-wide text-blue-100">Productivity score</p>
          <p className="text-2xl font-bold">{productivity}%</p>
        </div>
      </div>
    </Card>
  );
}

export default AIResultCard;
