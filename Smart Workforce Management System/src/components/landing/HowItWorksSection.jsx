import {
  UserCheck,
  Database,
  BrainCircuit,
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: <UserCheck size={30} />,
    title: "Employee Activities",
    description:
      "Employees complete tasks, update progress, and collaborate with their teams.",
  },
  {
    icon: <Database size={30} />,
    title: "Collect Workforce Data",
    description:
      "Attendance, projects, productivity, and workload data are collected securely.",
  },
  {
    icon: <BrainCircuit size={30} />,
    title: "AI Analysis Engine",
    description:
      "AI analyzes trends, workloads, risks, and performance patterns in real time.",
  },
  {
    icon: <BarChart3 size={30} />,
    title: "Productivity Intelligence",
    description:
      "Actionable insights are generated from workforce analytics and predictions.",
  },
  {
    icon: <LayoutDashboard size={30} />,
    title: "Manager Dashboard",
    description:
      "Managers monitor KPIs, employee performance, and AI recommendations.",
  },
  {
    icon: <TrendingUp size={30} />,
    title: "Better Decisions",
    description:
      "Organizations improve productivity through data-driven decision making.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            How It Works
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            From Workforce Data to Better Decisions
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Our AI-powered workflow transforms daily workforce activities
            into meaningful insights that help managers make smarter decisions.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-20 flex flex-col lg:flex-row items-stretch justify-between gap-auto">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex lg:flex-row flex-col items-center flex-1"
            >
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-full">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {step.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {step.description}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-4">
                  <ArrowRight className="text-blue-500" size={30} />
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;