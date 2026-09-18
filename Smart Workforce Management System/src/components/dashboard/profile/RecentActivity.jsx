import {
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import api from "../../../lib/api";

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/notification/getAll")
      .then((response) => setActivities((response.data.notifications || []).slice(0, 5)))
      .catch(() => setActivities([]));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Latest employee and AI activities
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {activities.map((activity, index) => (

          <div
            key={activity.id}
            className="relative flex gap-4"
          >

            {/* Timeline Line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-6 top-14 w-0.5 h-12 bg-gray-200" />
            )}

            {/* Icon */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
              <FaClock />
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-gray-800">{activity.title}</h3>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaClock />
                  {dayjs(activity.createdAt).format("DD MMM, HH:mm")}
                </div>

              </div>

              <p className="text-gray-600 mt-2">{activity.message || activity.description || "Notification activity"}</p>

            </div>

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