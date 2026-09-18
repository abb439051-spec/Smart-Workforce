import { CheckCircle2, User, Users } from "lucide-react";

const employeeFeatures = [
  "Daily Productivity Score",
  "Task Completion Rate",
  "Focus Hours",
  "Goal Progress",
  "AI Insights",
];

const managerFeatures = [
  "Team Overview",
  "Delayed Tasks",
  "Employee Workload",
  "Team Performance",
  "Risk Alerts",
];

function FeatureCard({ title, icon, features }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mt-6">
        {title}
      </h3>

      <div className="mt-8 space-y-5">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              size={20}
              className="text-green-500"
            />

            <span className="text-slate-600">
              {feature}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-50 to-white" id="features">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-blue-600 text-center font-semibold">
          Key Features
        </p>

        <h2 className="text-5xl font-bold text-center mt-5">
          Everything You Need
          <br />
          to Manage Your Workforce
        </h2>

        <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mt-6">
          Powerful dashboards for both employees and managers,
          powered by AI-driven analytics and workforce intelligence.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <FeatureCard
            title="Employee Performance Dashboard"
            icon={<User size={28} />}
            features={employeeFeatures}
          />

          <FeatureCard
            title="Manager Dashboard"
            icon={<Users size={28} />}
            features={managerFeatures}
          />

        </div>

      </div>

    </section>
  );
}

export default FeaturesSection;