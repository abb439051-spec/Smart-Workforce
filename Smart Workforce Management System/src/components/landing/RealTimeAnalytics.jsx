import {
  Users,
  ClipboardList,
  Gauge,
  Flame,
  TrendingUp,
  CalendarCheck,
  Building2,
  BarChart3,
} from "lucide-react";

const analytics = [
  {
    title: "Total Employees",
    value: "248",
    icon: <Users size={26} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Tasks",
    value: "1,286",
    icon: <ClipboardList size={26} />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Productivity Index",
    value: "92%",
    icon: <Gauge size={26} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Burnout Risk",
    value: "18%",
    icon: <Flame size={26} />,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Team Efficiency",
    value: "89%",
    icon: <TrendingUp size={26} />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Attendance Trends",
    value: "96%",
    icon: <CalendarCheck size={26} />,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Department Comparison",
    value: "8 Teams",
    icon: <Building2 size={26} />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Monthly Performance",
    value: "+12%",
    icon: <BarChart3 size={26} />,
    color: "bg-emerald-100 text-emerald-600",
  },
];

function RealTimeAnalytics() {
  return (
    <section className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-400 font-semibold">
            Real-Time Analytics
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-5">
            Monitor Your Workforce in Real Time
          </h2>

          <p className="text-lg text-slate-300 mt-6 max-w-3xl mx-auto">
            Gain instant visibility into workforce productivity,
            engagement, attendance, and operational performance.
          </p>

        </div>

        {/* Dashboard Preview */}

        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {analytics.map((item) => (

              <div
                key={item.title}
                className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>

                <h3 className="text-slate-500 mt-5">
                  {item.title}
                </h3>

                <p className="text-3xl font-bold mt-2 text-slate-900">
                  {item.value}
                </p>

              </div>

            ))}

          </div>

          {/* Bottom Summary */}

          <div className="mt-10 rounded-2xl bg-blue-600 text-white p-6">

            <h3 className="text-xl font-semibold">
              Live AI Summary
            </h3>

            <p className="mt-3 text-blue-100 leading-7">
              Overall workforce productivity has increased by
              <strong> 12% </strong>
              compared to last month. Burnout risk remains low, while
              attendance and collaboration continue to improve across departments.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RealTimeAnalytics;