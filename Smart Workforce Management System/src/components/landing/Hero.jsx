import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center" id="home">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <div>

          <h1 className="max-w-xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Transform Workforce Data into
            <span className="text-blue-600"> Actionable Intelligence</span>
          </h1>

          <p className="max-w-lg text-gray-600 text-lg mt-6 leading-8">
            Workforce Productivity Intelligence helps organizations measure
            performance, optimize workloads, predict delays, and empower teams
            using AI-powered workforce analytics.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Start your workspace
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">

            <div>
              <h2 className="text-3xl font-bold text-blue-600">500+</h2>
              <p className="text-gray-600">Teams</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">50K+</h2>
              <p className="text-gray-600">Tasks</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">95%</h2>
              <p className="text-gray-600">Accuracy</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">40%</h2>
              <p className="text-gray-600">Faster Decisions</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="bg-white shadow-2xl rounded-3xl p-20 w-full max-w-md">

            <h3 className="text-xl font-bold mb-6">
              Workforce Overview
            </h3>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>Productivity</span>
                <span className="font-bold text-green-600">92%</span>
              </div>

              <div className="flex justify-between">
                <span>Workload Balance</span>
                <span className="font-bold text-blue-600">84%</span>
              </div>

              <div className="flex justify-between">
                <span>Burnout Risk</span>
                <span className="font-bold text-red-500">18%</span>
              </div>

              <div className="flex justify-between">
                <span>Goal Achievement</span>
                <span className="font-bold text-purple-600">91%</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;