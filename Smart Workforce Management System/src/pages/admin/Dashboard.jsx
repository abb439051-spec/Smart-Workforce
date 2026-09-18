import { useEffect, useState } from "react";
import { Spin } from "antd";
import api from "../../lib/api";
import AIInsights from "../../components/dashboard/AIInsights";
import RecentActivity from "../../components/dashboard/RecentActivity";
import WorkforceHealth from "../../components/dashboard/WorkforceHealth";

import {
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const response = await api.get("/analytics/dashboard");
      setDashboard(response.data.data);
    };

    const refreshDashboard = () => {
      loadDashboard().catch((error) => {
        console.error("Dashboard error:", error);
      });
    };

    refreshDashboard();
    window.addEventListener("focus", refreshDashboard);
    window.addEventListener("workforce:data-changed", refreshDashboard);
    document.addEventListener("visibilitychange", refreshDashboard);

    return () => {
      window.removeEventListener("focus", refreshDashboard);
      window.removeEventListener("workforce:data-changed", refreshDashboard);
      document.removeEventListener("visibilitychange", refreshDashboard);
    };
  }, []);

  if (!dashboard) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Workforce Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening in your organization today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Employees",
            value: dashboard.cards.totalEmployees,
            icon: <FaUsers />,
            color: "from-blue-600 to-cyan-500",
            iconColor: "text-blue-600",
            text: "Current workforce",
          },
          {
            title: "Active Projects",
            value: dashboard.cards.activeProjects,
            icon: <FaProjectDiagram />,
            color: "from-emerald-600 to-green-500",
            iconColor: "text-emerald-600",
            text: "Currently active",
          },
          {
            title: "Pending Tasks",
            value: dashboard.cards.pendingTasks,
            icon: <FaTasks />,
            color: "from-amber-500 to-orange-500",
            iconColor: "text-orange-600",
            text: "Needs attention",
          },
          {
            title: "Productivity Score",
            value: `${dashboard.cards.employeeProductivity}%`,
            icon: <FaChartLine />,
            color: "from-violet-600 to-purple-500",
            iconColor: "text-purple-600",
            text: "Based on active tasks",
          },
        ].map((card) => (
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <AIInsights />
        <RecentActivity />
      </div>

      <div className="mt-8">
        <WorkforceHealth
          overloadAlerts={dashboard.overloadAlerts}
          productivity={dashboard.cards.employeeProductivity}
          burnoutRisk={dashboard.burnoutRisk ?? dashboard.cards.burnoutRisk}
          workloadBalance={dashboard.cards.workloadBalance ?? 100}
          workloadRecommendations={dashboard.workloadRecommendations}
          delayPredictions={dashboard.delayPredictions}
        />
      </div>

    </div>
  );
}

export default Dashboard;