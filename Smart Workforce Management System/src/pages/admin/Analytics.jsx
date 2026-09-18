import { useEffect, useState } from "react";
import api from "../../lib/api";
import { message, Spin } from "antd";

import AnalyticsHeader from "../../components/dashboard/analytics/AnalyticsHeader";
import AnalyticsCards from "../../components/dashboard/analytics/AnalyticsCards";
import ProductivityChart from "../../components/dashboard/analytics/ProductivityChart";
import WorkloadChart from "../../components/dashboard/analytics/WorkloadChart";
import DepartmentChart from "../../components/dashboard/analytics/DepartmentChart";
import AIInsights from "../../components/dashboard/analytics/AIInsights";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await api.get("/analytics/dashboard");

      if (response.data.success) {
        setAnalytics(response.data.data);
      } else {
        message.error(
          response.data.message || "Failed to load analytics"
        );
      }
    } catch (error) {
      console.error("Analytics error:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Analytics unavailable
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Unable to load workforce analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <AnalyticsCards
        cards={analytics.cards}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProductivityChart
          data={analytics.productivity}
        />

        <WorkloadChart
          data={analytics.workload}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DepartmentChart
          data={analytics.departments}
        />

        <AIInsights />
      </div>
    </div>
  );
}

export default Analytics;