import { useEffect, useState } from "react";
import { FaListCheck } from "react-icons/fa6";
import dayjs from "dayjs";
import api from "../../lib/api";

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/notification/getAll")
      .then((response) => setActivities((response.data.notifications || []).slice(0, 5)))
      .catch((error) => console.error("Activity error:", error));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-5">
        <FaListCheck/> Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="pb-3 border-b last:border-none"
          >
            <p className="text-gray-600">
              <span>{activity.title}</span>
              <span className="ml-2 text-sm text-gray-400">
                {dayjs(activity.createdAt).format("DD MMM, HH:mm")}
              </span>
            </p>
          </div>
        ))}
        {!activities.length && (
          <p className="text-sm text-gray-500">No recent activity available.</p>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;