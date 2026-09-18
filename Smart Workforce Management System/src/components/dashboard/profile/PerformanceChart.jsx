import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PerformanceChart({ data = [] }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-semibold">
            Weekly Performance
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            AI analyzed productivity over the last 7 days
          </p>

        </div>

        <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
          Live
        </div>

      </div>

      {data.length ? (
        <div className="min-h-[320px] flex-1">
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <LineChart data={data} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
          />

          <YAxis
            domain={[60, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="productivity"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-slate-50 text-sm text-gray-500">
          No performance data available yet.
        </div>
      )}

    </div>
  );
}

export default PerformanceChart;