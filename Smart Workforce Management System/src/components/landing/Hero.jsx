import { Link } from "react-router-dom";

function Hero() {
  return (
    <section 
      className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center pt-10 pb-12 md:py-20 lg:py-0" 
      id="home"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Left Content */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Transform Workforce Data into{" "}
            <span className="text-blue-600 block sm:inline">Actionable Intelligence</span>
          </h1>
          
          <p className="max-w-xl text-gray-600 text-base sm:text-lg mt-6 leading-relaxed sm:leading-8">
            Workforce Productivity Intelligence helps organizations measure
            performance, optimize workloads, predict delays, and empower teams
            using AI-powered workforce analytics.
          </p>
          
          <Link
            to="/register"
            className="mt-8 mb-12 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
          >
            Start your workspace
          </Link>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full border-t border-gray-100 pt-8 lg:border-0 lg:pt-0">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">500+</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Teams</p>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">50K+</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Tasks</p>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">95%</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Accuracy</p>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">40%</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Faster Decisions</p>
            </div>
          </div>
        </div>

        {/* Right Side (Card Visual) */}
        <div className="flex justify-center w-full mt-4 lg:mt-0">
          <div className="bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 w-full max-w-md border border-gray-50">
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-800 text-center sm:text-left"> 
              Workforce Overview 
            </h3>
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-600">
              <div className="flex justify-between items-center py-1">
                <span>Productivity</span>
                <span className="font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg text-sm">92%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Workload Balance</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg text-sm">84%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Burnout Risk</span>
                <span className="font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg text-sm">18%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Goal Achievement</span>
                <span className="font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg text-sm">91%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
