import {
  Users,
  Clock3,
  Flame,
  Eye,
  FileSpreadsheet,
  TriangleAlert,
} from "lucide-react";

function ProblemSection() {
  const problems = [
    {
      icon: <Users size={34} />,
      title: "Uneven Workload Distribution",
      description:
        "Some employees become overloaded while others remain underutilized.",
    },
    {
      icon: <Clock3 size={34} />,
      title: "Missed Deadlines",
      description:
        "Poor workload planning often results in delayed project delivery.",
    },
    {
      icon: <Flame size={34} />,
      title: "Employee Burnout",
      description:
        "Continuous overwork decreases productivity and employee satisfaction.",
    },
    {
      icon: <Eye size={34} />,
      title: "Low Performance Visibility",
      description:
        "Managers struggle to monitor productivity across departments.",
    },
    {
      icon: <FileSpreadsheet size={34} />,
      title: "Manual Performance Tracking",
      description:
        "Collecting reports manually consumes valuable management time.",
    },
    {
      icon: <TriangleAlert size={34} />,
      title: "Delayed Project Completion",
      description:
        "Lack of actionable insights leads to slow project execution.",
    },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-blue-600 uppercase tracking-[0.3em] text-center font-semibold">
          The Problem
        </p>

        <h2 className="text-5xl font-bold text-center text-slate-900 mt-4">
          Your Workforce Is Working.
          <br />
          But Do You Know How Productively?
        </h2>

        <p className="text-center text-slate-600 max-w-3xl mx-auto mt-8 text-lg">
          Organizations often struggle to balance workloads,
          monitor productivity, prevent burnout, and make
          informed workforce decisions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                {problem.icon}
              </div>

              <h3 className="text-2xl font-semibold text-slate-900">
                {problem.title}
              </h3>

              <p className="text-slate-600 mt-4 leading-7">
                {problem.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ProblemSection;