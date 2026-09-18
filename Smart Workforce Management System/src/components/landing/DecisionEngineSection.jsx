import {
  BrainCircuit,
  Building2,
  Users,
  FolderClock,
  TrendingDown,
  Boxes,
  Sparkles,
} from "lucide-react";

const questions = [
  "Which department performs best?",
  "Who needs additional support?",
  "Which projects are behind schedule?",
  "Where is productivity decreasing?",
  "Which team requires more resources?",
];

const insights = [
  {
    icon: <Building2 size={20} />,
    title: "Top Performing Department",
    text: "Engineering maintained the highest productivity score at 94% this month.",
  },
  {
    icon: <Users size={20} />,
    title: "Support Required",
    text: "Marketing has three overloaded employees requiring workload balancing.",
  },
  {
    icon: <FolderClock size={20} />,
    title: "Project Alert",
    text: "CRM Migration is predicted to miss its deadline by four days.",
  },
  {
    icon: <TrendingDown size={20} />,
    title: "Performance Trend",
    text: "Customer Support productivity decreased by 9% compared to last month.",
  },
  {
    icon: <Boxes size={20} />,
    title: "Resource Recommendation",
    text: "Assign two additional developers to the Mobile App team.",
  },
];

function DecisionEngineSection() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            AI-Powered Decision Engine
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Make Better Decisions with AI
          </h2>

          <p className="text-lg text-slate-600 mt-6 max-w-3xl mx-auto">
            Ask business questions in natural language and receive actionable
            recommendations backed by workforce intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">

          {/* Left Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

            <div className="flex items-center gap-3 mb-8">
              <BrainCircuit className="text-blue-600" />
              <h3 className="text-2xl font-bold">
                Ask AI
              </h3>
            </div>

            <div className="space-y-4">
              {questions.map((question) => (
                <button
                  key={question}
                  className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  {question}
                </button>
              ))}
            </div>

          </div>

          {/* Right Panel */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">

            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-blue-400" />
              <h3 className="text-2xl font-bold">
                AI Recommendations
              </h3>
            </div>

            <div className="space-y-5">

              {insights.map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-800 rounded-2xl p-5 border border-slate-700"
                >
                  <div className="flex items-center gap-3 text-blue-400 mb-3">
                    {item.icon}
                    <h4 className="font-semibold">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-slate-300 leading-7">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DecisionEngineSection;