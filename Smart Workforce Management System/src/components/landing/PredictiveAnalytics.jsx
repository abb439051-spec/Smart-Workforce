import {
  Flame,
  CalendarClock,
  TrendingUp,
  Users,
  CircleCheckBig,
} from "lucide-react";

const predictions = [
  {
    icon: <Flame size={28} />,
    title: "Burnout Risk",
    value: "18%",
    status: "Medium",
    color: "text-orange-500",
  },
  {
    icon: <CalendarClock size={28} />,
    title: "Missed Deadlines",
    value: "8%",
    status: "Low",
    color: "text-red-500",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Productivity Trend",
    value: "+12%",
    status: "Next Month",
    color: "text-green-500",
  },
  {
    icon: <Users size={28} />,
    title: "Resource Shortage",
    value: "Marketing",
    status: "Department",
    color: "text-blue-500",
  },
  {
    icon: <CircleCheckBig size={28} />,
    title: "Completion Probability",
    value: "91%",
    status: "Project",
    color: "text-emerald-500",
  },
];

function PredictiveAnalytics() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Predictive Analytics
          </p>

          <h2 className="text-5xl font-bold mt-5">
            AI Predicts Problems Before They Happen
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Anticipate risks, optimize resources, and improve workforce
            performance with AI-powered predictive analytics.
          </p>
        </div>

        <div className="mt-20 bg-white rounded-3xl border border-slate-200 shadow-xl p-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

            {predictions.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition duration-300"
              >
                <div className={`${item.color} mb-5`}>
                  {item.icon}
                </div>

                <p className="text-slate-500 text-sm">
                  {item.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {item.value}
                </h3>

                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">
                  {item.status}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-10 rounded-2xl bg-blue-600 text-white p-6">
            <h4 className="font-semibold text-lg">
              AI Insight
            </h4>

            <p className="mt-3 text-blue-100 leading-7">
              Based on current workload patterns, the Marketing department
              has an elevated burnout risk. Reallocating campaign tasks now
              could improve delivery performance and reduce employee fatigue.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default PredictiveAnalytics;