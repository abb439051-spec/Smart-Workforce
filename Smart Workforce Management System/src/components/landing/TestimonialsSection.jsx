import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Project Manager",
    company: "TechNova Solutions",
    quote:
      "Workforce Productivity Intelligence helped us identify workload imbalance across teams and improve project delivery by 30%.",
  },
  {
    name: "Priya Mehta",
    role: "HR Director",
    company: "InnovateX",
    quote:
      "Instead of tracking hours, we finally understand how work is actually getting done. The AI insights transformed our workforce planning.",
  },
  {
    name: "Amit Verma",
    role: "Operations Manager",
    company: "BuildCore",
    quote:
      "The predictive analytics helped us detect project risks early, reducing delays and improving team productivity.",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Trusted by Teams Worldwide
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Hear what managers and organizations say about using
            Workforce Productivity Intelligence.
          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              <Quote
                className="text-blue-600"
                size={36}
              />

              <div className="flex gap-1 mt-5">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="mt-6 text-slate-600 leading-8">
                "{item.quote}"
              </p>

              <div className="flex items-center mt-8">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {item.name.charAt(0)}
                </div>

                <div className="ml-4">

                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-slate-500 text-sm">
                    {item.role}
                  </p>

                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {item.company}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;