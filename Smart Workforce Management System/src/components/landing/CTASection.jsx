import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900" id="demo">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">

          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 border border-blue-300/20 text-sm font-medium">
            AI Workforce Intelligence
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white mt-8 leading-tight">
            Build a Smarter Workforce with AI
          </h2>

          <p className="text-blue-100 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8">
            Stop guessing. Start making data-driven workforce decisions with
            AI-powered productivity analytics, predictive insights, and
            intelligent workforce management.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

            <Link to="/register" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight size={20} />
            </Link>

            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center gap-2">

              <CalendarDays size={20} />

              Schedule a Demo

            </button>

          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">

            <div>
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-blue-200 mt-2">Organizations Trust Us</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">50K+</h3>
              <p className="text-blue-200 mt-2">Tasks Analyzed Daily</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">95%</h3>
              <p className="text-blue-200 mt-2">AI Prediction Accuracy</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;