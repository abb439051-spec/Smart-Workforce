import { Bot, Sparkles, ArrowRight } from "lucide-react";

const prompts = [
  "Why is the Marketing Team slower this month?",
  "Which employees are overloaded?",
  "Which project is causing delays?",
];

function AIInsightsSection() {
  return (
    <section className="py-28 bg-slate-900 text-white" id="ai">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <p className="uppercase tracking-[0.3em] text-blue-400 text-center font-semibold">
          AI Productivity Insights
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-center mt-5">
          Ask AI. Get Instant Workforce Insights.
        </h2>

        <p className="text-slate-300 text-lg text-center max-w-3xl mx-auto mt-6">
          Use natural language to identify productivity bottlenecks,
          overloaded employees, delayed projects, and workforce trends.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          {/* Left Panel */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

            <div className="flex items-center gap-3 mb-8">
              <Bot className="text-blue-400" />
              <h3 className="text-2xl font-semibold">
                Ask AI
              </h3>
            </div>

            <div className="space-y-4">

              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  className="w-full text-left bg-slate-700 hover:bg-blue-600 transition p-5 rounded-2xl"
                >
                  {prompt}
                </button>
              ))}

            </div>

          </div>

          {/* Right Panel */}
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl">

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-600" />
              <h3 className="text-2xl font-bold">
                AI Response
              </h3>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6">

              <p className="leading-8 text-slate-600">
                Marketing productivity is
                <span className="font-bold text-red-500"> 18% lower </span>
                this month due to increased workload and campaign deadlines.
              </p>

              <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-200">

                <p className="font-semibold text-blue-700">
                  AI Recommendation
                </p>

                <p className="mt-3 text-slate-600">
                  Move three tasks from Sarah to John to reduce
                  burnout risk and improve delivery speed.
                </p>

              </div>

              <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold">
                View Detailed Analysis
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AIInsightsSection;