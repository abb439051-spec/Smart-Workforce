import { ArrowRightLeft, BrainCircuit } from "lucide-react";

const before = [
  { name: "Sarah", workload: 96 },
  { name: "John", workload: 22 },
  { name: "Priya", workload: 81 },
  { name: "Alex", workload: 15 },
];

const after = [
  { name: "Sarah", workload: 68 },
  { name: "John", workload: 61 },
  { name: "Priya", workload: 73 },
  { name: "Alex", workload: 58 },
];

function ProgressRow({ employee }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-slate-700">{employee.name}</span>
        <span className="font-semibold text-blue-600">
          {employee.workload}%
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${employee.workload}%` }}
        />
      </div>
    </div>
  );
}

function WorkloadSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Smart Workload Distribution
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Balanced Teams. Better Results.
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-6">
            AI identifies overloaded and underutilized employees,
            then recommends a balanced task distribution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">

          {/* Before */}
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
            <h3 className="text-2xl font-bold text-red-600 mb-8">
              Before AI
            </h3>

            {before.map((employee) => (
              <ProgressRow
                key={employee.name}
                employee={employee}
              />
            ))}
          </div>

          {/* After */}
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
            <h3 className="text-2xl font-bold text-green-600 mb-8">
              After AI
            </h3>

            {after.map((employee) => (
              <ProgressRow
                key={employee.name}
                employee={employee}
              />
            ))}
          </div>

        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BrainCircuit className="text-blue-400" size={36} />
            <div>
              <h3 className="text-xl font-semibold">
                AI Recommendation
              </h3>
              <p className="text-slate-300 mt-2">
                Move <strong>3 tasks</strong> from Sarah to John to reduce burnout
                risk while maintaining project deadlines.
              </p>
            </div>
          </div>

          <ArrowRightLeft className="text-blue-400" size={40} />
        </div>

      </div>
    </section>
  );
}

export default WorkloadSection;