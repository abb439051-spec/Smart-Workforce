import { Building2, BarChart3, CheckCircle2, TrendingUp } from "lucide-react";

function TrustedBy() {
  const stats = [
    {
      value: "500+",
      title: "Teams",
      icon: <Building2 size={28} />,
    },
    {
      value: "50,000+",
      title: "Tasks Analyzed",
      icon: <BarChart3 size={28} />,
    },
    {
      value: "95%",
      title: "Reporting Accuracy",
      icon: <CheckCircle2 size={28} />,
    },
    {
      value: "40%",
      title: "Faster Decision Making",
      icon: <TrendingUp size={28} />,
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <p className="text-center uppercase tracking-[0.3em] text-blue-600 font-semibold">
          Trusted By
        </p>

        <h2 className="text-4xl font-bold text-center text-slate-900 mt-4">
          Trusted by Growing Organizations Worldwide
        </h2>

        {/* Logo Placeholders */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-14">

          {["Company", "Enterprise", "Future Tech", "InnovateX", "TechFlow", "NextGen"].map(
            (item) => (
              <div
                key={item}
                className="border border-slate-200 rounded-2xl py-6 flex justify-center items-center text-slate-400 font-semibold hover:border-blue-500 hover:text-blue-600 transition duration-300"
              >
                {item}
              </div>
            )
          )}

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-slate-50 rounded-3xl border border-slate-200 p-8 hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 mb-5">
                {stat.icon}
              </div>

              <h3 className="text-4xl font-bold text-slate-900">
                {stat.value}
              </h3>

              <p className="text-slate-600 mt-2">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedBy;