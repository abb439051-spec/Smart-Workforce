import {
  BarChart3,
  Scale,
  Bot,
  Users,
  BrainCircuit,
  LayoutDashboard,
} from "lucide-react";

const solutions = [
  {
    icon: <BarChart3 size={36} />,
    title: "Productivity Analytics",
    description:
      "Track productivity with detailed insights and performance metrics.",
  },
  {
    icon: <Scale size={36} />,
    title: "Workload Balancing",
    description:
      "Distribute work fairly to avoid overload and improve efficiency.",
  },
  {
    icon: <Bot size={36} />,
    title: "AI Recommendations",
    description:
      "Receive intelligent suggestions to improve workforce performance.",
  },
  {
    icon: <Users size={36} />,
    title: "Team Performance",
    description:
      "Monitor individual and team progress from one dashboard.",
  },
  {
    icon: <BrainCircuit size={36} />,
    title: "Predictive Analytics",
    description:
      "Predict delays, burnout, and resource shortages before they happen.",
  },
  {
    icon: <LayoutDashboard size={36} />,
    title: "Executive Dashboards",
    description:
      "Visualize KPIs and make data-driven business decisions.",
  },
];

function SolutionSection() {
  return (
    <section className="bg-white py-28" id="solutions">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-blue-600 uppercase tracking-[0.3em] text-center font-semibold">
          Our Solution
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-center mt-5">
          One Platform.
          <br />
          Complete Workforce Intelligence
        </h2>

        <p className="text-slate-600 text-lg max-w-3xl text-center mx-auto mt-6">
          Transform raw workforce data into actionable insights with
          AI-powered analytics, smart workload balancing, and executive
          dashboards.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {solutions.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-600 mt-4 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SolutionSection;