import { FaRobot } from "react-icons/fa";

function AIHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 text-white shadow-sm md:p-8">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-400/20" />

      <div className="flex items-center gap-4">

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/20">
          <FaRobot />
        </div>

        <div>

          <h1 className="text-3xl font-bold">
            AI Workforce Assistant
          </h1>

          <p className="mt-2 max-w-2xl text-blue-100">
            Ask questions about employees, workload, productivity and projects.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AIHeader;