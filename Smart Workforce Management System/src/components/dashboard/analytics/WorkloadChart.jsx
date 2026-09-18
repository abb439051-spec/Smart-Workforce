import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#991b1b",
];

function WorkloadChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Workload Distribution
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current employee workload distribution.
        </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          {total} people
        </span>
      </div>

      {data.length && total ? <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={112}
            innerRadius={68}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `${value} employees`,
              "Employees",
            ]}
          />

          <Legend verticalAlign="bottom" height={42} />
        </PieChart>
      </ResponsiveContainer> : (
        <div className="flex h-[340px] items-center justify-center rounded-xl bg-slate-50 text-sm text-gray-500">
          No workload data available yet.
        </div>
      )}
    </div>
  );
}

export default WorkloadChart;