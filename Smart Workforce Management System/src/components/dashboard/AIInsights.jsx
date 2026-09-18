import { useEffect, useState } from "react";
import { Spin } from "antd";
import { FaWandMagicSparkles } from 'react-icons/fa6';
import api from "../../lib/api";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [responseRecommendation, setResponseRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = () => {
      setLoading(true);
      api.get("/analytics/ai-insights")
        .then((response) => {
          setInsights(response.data.data?.insights || []);
          setResponseRecommendation(response.data.data?.recommendation || null);
        })
        .catch((error) => console.error("Dashboard AI insights error:", error))
        .finally(() => setLoading(false));
    };

    loadInsights();
    window.addEventListener("focus", loadInsights);
    window.addEventListener("workforce:data-changed", loadInsights);
    document.addEventListener("visibilitychange", loadInsights);

    return () => {
      window.removeEventListener("focus", loadInsights);
      window.removeEventListener("workforce:data-changed", loadInsights);
      document.removeEventListener("visibilitychange", loadInsights);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-5">
         <FaWandMagicSparkles/> AI Insights
      </h2>

      {loading ? <div className="flex justify-center py-8"><Spin /></div> : <div className="space-y-7">
        {responseRecommendation && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="text-lg font-bold text-blue-700">AI Recommendation</h3>
            <p className="mt-2 text-sm text-slate-700">{responseRecommendation.details}</p>
            {responseRecommendation.tasks?.length > 0 && (
              <p className="mt-3 text-xs font-medium text-slate-600">
                Suggested tasks: {responseRecommendation.tasks.map((task) => task.taskName).join(", ")}
              </p>
            )}
          </div>
        )}
        {insights.filter((item) => item.title !== "AI Recommendation").map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-600 pl-4"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.description}
            </p>
          </div>
        ))}
        {!insights.length && <p className="text-sm text-gray-500">No AI insights available.</p>}
      </div>
      }
    </div>
  );
}

export default AIInsights;