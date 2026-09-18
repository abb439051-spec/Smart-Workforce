import {
  Monitor,
  Server,
  Database,
  BrainCircuit,
  Network,
  Boxes,
  LayoutDashboard,
  ArrowDown,
} from "lucide-react";

const stack = [
  {
    title: "React.js + Vite",
    subtitle: "Modern Frontend",
    icon: <Monitor size={28} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Node.js + Express",
    subtitle: "Backend API",
    icon: <Server size={28} />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "MongoDB Atlas",
    subtitle: "Cloud Database",
    icon: <Database size={28} />,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Ollama AI",
    subtitle: "Local AI Models",
    icon: <BrainCircuit size={28} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "LangChain",
    subtitle: "AI Orchestration",
    icon: <Network size={28} />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "ChromaDB",
    subtitle: "Vector Database",
    icon: <Boxes size={28} />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Real-Time Dashboard",
    subtitle: "Socket.IO",
    icon: <LayoutDashboard size={28} />,
    color: "bg-indigo-100 text-indigo-600",
  },
];

function TechnologyStackSection() {
  return (
    <section className="py-28 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-blue-400 font-semibold">
            Technology Stack
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Built with Modern Technologies
          </h2>

          <p className="text-lg text-slate-400 mt-6 max-w-2xl mx-auto">
            Our platform combines modern web technologies, AI frameworks,
            and real-time communication to deliver intelligent workforce
            management.
          </p>

        </div>

        {/* Architecture Flow */}
        <div className="mt-20 flex flex-col items-center">

          {stack.map((item, index) => (
            <div key={item.title} className="flex flex-col items-center">

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-80 shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>

                <h3 className="text-white text-2xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-2">
                  {item.subtitle}
                </p>

              </div>

              {index !== stack.length - 1 && (
                <ArrowDown
                  className="text-blue-500 my-5"
                  size={28}
                />
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TechnologyStackSection;