import { useEffect, useState } from "react";
import { Spin, Tag, message } from "antd";
import { FaTasks, FaCheckCircle, FaProjectDiagram, FaUsers } from "react-icons/fa";
import api from "../../lib/api";
import AIInsights from "../../components/dashboard/AIInsights";
import RecentActivity from "../../components/dashboard/RecentActivity";
import WorkforceHealth from "../../components/dashboard/WorkforceHealth";

function Dashboard() {
  const [data, setData] = useState({
    projects: [],
    tasks: [],
    users: [],
    analytics: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const requests = [
        ["/project/getAll", "projects"],
        ["/task/getAll", "tasks"],
        ["/user/getAll", "team members"],
        ["/analytics/dashboard", "workforce analytics"],
      ].map(([path, label]) =>
        api.get(path).catch((error) => {
          error.dashboardEndpoint = label;
          throw error;
        })
      );

      const [
        projectResponse,
        taskResponse,
        userResponse,
        analyticsResponse,
      ] = await Promise.all(requests);

      setData({
        projects: projectResponse.data.projects || [],
        tasks: taskResponse.data.tasks || [],
        users: userResponse.data.users || [],
        analytics: analyticsResponse.data.data || null,
      });
    };

    const refreshDashboard = () => {
      loadDashboard()
        .catch((error) => {
          const endpoint = error.dashboardEndpoint
            ? ` (${error.dashboardEndpoint})`
            : "";
          message.error(
            `${error.response?.data?.message || "Unable to load dashboard"}${endpoint}`
          );
        })
        .finally(() => setLoading(false));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshDashboard();
      }
    };

    refreshDashboard();
    window.addEventListener("focus", refreshDashboard);
    window.addEventListener("workforce:data-changed", refreshDashboard);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshDashboard);
      window.removeEventListener("workforce:data-changed", refreshDashboard);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading) {
    return <div className="flex min-h-[400px] items-center justify-center"><Spin size="large" /></div>;
  }

  const completedTasks = data.tasks.filter((task) => task.status === "Completed").length;
  const cards = [
    { title: "My Projects", value: data.projects.length, icon: <FaProjectDiagram />, color: "from-blue-600 to-cyan-500", iconColor: "text-blue-600", text: "Projects assigned to you" },
    { title: "Team Members", value: data.users.length, icon: <FaUsers />, color: "from-violet-600 to-purple-500", iconColor: "text-purple-600", text: "Employees in your scope" },
    { title: "Active Tasks", value: data.tasks.length - completedTasks, icon: <FaTasks />, color: "from-amber-500 to-orange-500", iconColor: "text-orange-600", text: "Tasks needing attention" },
    { title: "Completed Tasks", value: completedTasks, icon: <FaCheckCircle />, color: "from-emerald-600 to-green-500", iconColor: "text-emerald-600", text: "Finished team tasks" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
        <p className="mt-2 text-gray-500">Track your projects and team workload.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">{card.value}</p>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg ${card.iconColor} transition-transform group-hover:scale-105`}>
                {card.icon}
              </div>
            </div>
            <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">{card.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">My Projects</h2>
        <div className="space-y-3">
          {data.projects.slice(0, 5).map((project) => (
            <div key={project._id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <span className="font-medium">{project.projectName}</span>
              <Tag color={project.status === "Completed" ? "green" : "blue"}>{project.status}</Tag>
            </div>
          ))}
          {!data.projects.length && <p className="text-sm text-gray-500">No projects assigned.</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AIInsights />
        <RecentActivity />
      </div>
      {data.analytics && (
        <WorkforceHealth
          overloadAlerts={data.analytics.overloadAlerts}
          productivity={data.analytics.cards?.employeeProductivity}
          burnoutRisk={data.analytics.burnoutRisk ?? data.analytics.cards?.burnoutRisk}
          workloadBalance={data.analytics.cards?.workloadBalance ?? 100}
          workloadRecommendations={data.analytics.workloadRecommendations}
          delayPredictions={data.analytics.delayPredictions}
        />
      )}
    </div>
  );
}

export default Dashboard;
