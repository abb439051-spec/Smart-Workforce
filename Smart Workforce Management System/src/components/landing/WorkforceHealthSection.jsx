import { Activity } from "lucide-react";

const metrics = [
  {
    title: "Productivity",
    value: 92,
    color: "bg-blue-600",
  },
  {
    title: "Workload Balance",
    value: 84,
    color: "bg-green-500",
  },
  {
    title: "Burnout Risk",
    value: 18,
    color: "bg-red-500",
  },
  {
    title: "Team Collaboration",
    value: 89,
    color: "bg-purple-500",
  },
  {
    title: "Goal Achievement",
    value: 91,
    color: "bg-amber-500",
  },
];

function WorkforceHealthSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Workforce Health Score
          </p>

          <h2 className="text-5xl font-bold mt-5">
            One Glance Tells You Everything
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Monitor your workforce with a unified health score powered by
            real-time AI analytics.
          </p>

        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-10 shadow-2xl">

          <div className="flex items-center gap-3 mb-10">

            <Activity className="text-blue-400" size={32} />

            <h3 className="text-3xl font-bold text-white">
              Workforce Overview
            </h3>

          </div>

          <div className="space-y-8">

            {metrics.map((item) => (

              <div key={item.title}>

                <div className="flex justify-between text-white mb-3">

                  <span>{item.title}</span>

                  <span className="font-bold">
                    {item.value}%
                  </span>

                </div>

                <div className="h-4 rounded-full bg-slate-700 overflow-hidden">

                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default WorkforceHealthSection;