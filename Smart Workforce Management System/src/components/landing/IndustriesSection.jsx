import {
  Laptop,
  Megaphone,
  Factory,
  Building2,
  HeartPulse,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const industries = [
  {
    title: "IT Companies",
    description:
      "Improve software development productivity, sprint planning, and engineering performance.",
    icon: <Laptop size={34} />,
  },
  {
    title: "Marketing Agencies",
    description:
      "Track campaign execution, creative workloads, and team collaboration.",
    icon: <Megaphone size={34} />,
  },
  {
    title: "Manufacturing",
    description:
      "Monitor shift efficiency, production teams, and workforce utilization.",
    icon: <Factory size={34} />,
  },
  {
    title: "Construction",
    description:
      "Manage site workers, project timelines, and resource allocation.",
    icon: <Building2 size={34} />,
  },
  {
    title: "Healthcare",
    description:
      "Optimize hospital staff scheduling and healthcare workforce performance.",
    icon: <HeartPulse size={34} />,
  },
  {
    title: "Educational Institutions",
    description:
      "Analyze faculty productivity, attendance, and administrative efficiency.",
    icon: <GraduationCap size={34} />,
  },
];

function IndustriesSection() {
  return (
    <section className="py-28 bg-white" id="industries">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Industries We Serve
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Built for Every Workforce
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Our AI-powered workforce intelligence platform adapts to different
            industries, helping organizations improve productivity,
            collaboration, and decision-making.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {industries.map((industry) => (

            <div
              key={industry.title}
              className="group rounded-3xl border border-slate-200 p-8 bg-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-white group-hover:text-blue-600 flex items-center justify-center">
                {industry.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {industry.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600 group-hover:text-blue-100">
                {industry.description}
              </p>

              <button className="flex items-center gap-2 mt-8 font-semibold group-hover:text-white">
                Learn More
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default IndustriesSection;