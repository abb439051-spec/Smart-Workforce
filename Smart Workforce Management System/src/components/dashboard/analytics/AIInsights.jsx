import { useEffect, useState } from "react";
import {
  FaRobot,
  FaArrowTrendUp,
  FaTriangleExclamation,
  FaLightbulb,
} from "react-icons/fa6";
import { Spin } from "antd";
import api from "../../../lib/api";

const icons = {
  alert: <FaTriangleExclamation />,
  growth: <FaArrowTrendUp />,
  recommendation: <FaLightbulb />,
  prediction: <FaRobot />,
};

const styles = {
  alert: {
    color: "text-red-500",
    bg: "bg-red-50",
  },
  growth: {
    color: "text-green-500",
    bg: "bg-green-50",
  },
  recommendation: {
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  prediction: {
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
};

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      setLoading(true);

      const response = await api.get("/analytics/ai-insights");

      if (response.data.success) {
        setInsights(
          response.data.data.insights || []
        );
      }
    } catch (error) {
      console.error(
        "AI Insights error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
          <FaRobot />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            AI Insights
          </h2>

          <p className="text-sm text-gray-500">
            AI-powered workforce analysis.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Spin />
        </div>
      ) : insights.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No AI insights available. Check that Gemini is configured on the backend.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => {
            const style =
              styles[item.type] ||
              styles.recommendation;

            return (
              <div
                key={`${item.title}-${index}`}
                className={`${style.bg} rounded-xl border border-gray-100 p-4`}
              >
                <div className="flex gap-4">
                  <div
                    className={`${style.color} mt-1 text-xl`}
                  >
                    {icons[item.type] ||
                      icons.recommendation}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AIInsights;