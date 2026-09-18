import {
  UserRound,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    title: "For Employees",
    icon: <UserRound size={34} />,
    gradient: "from-blue-600 to-cyan-500",
    items: [
      "Clear performance insights",
      "Balanced workload",
      "Personalized AI recommendations",
    ],
  },
  {
    title: "For Managers",
    icon: <BriefcaseBusiness size={34} />,
    gradient: "from-violet-600 to-indigo-500",
    items: [
      "Better team visibility",
      "Smarter resource allocation",
      "Faster decision making",
    ],
  },
  {
    title: "For Organizations",
    icon: <Building2 size={34} />,
    gradient: "from-emerald-600 to-green-500",
    items: [
      "Higher productivity",
      "Reduced burnout",
      "Improved project delivery",
      "Data-driven workforce planning",
    ],
  },
];

function BenefitsSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Benefits
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Designed for Everyone in Your Organization
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Whether you're an employee, manager, or business leader,
            Workforce Productivity Intelligence helps you make
            smarter decisions every day.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {benefits.map((section) => (

            <div
              key={section.title}
              className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <div
                className={`h-2 bg-gradient-to-r ${section.gradient}`}
              />

              <div className="p-8">

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.gradient} text-white flex items-center justify-center`}
                >
                  {section.icon}
                </div>

                <h3 className="text-2xl font-bold mt-6">
                  {section.title}
                </h3>

                <div className="space-y-5 mt-8">

                  {section.items.map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={20}
                        className="text-green-500"
                      />

                      <span className="text-slate-600">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default BenefitsSection;