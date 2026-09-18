import React from "react";

function StatCard({ title, value, icon, color, change }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">{value}</h2>
          {change && <p className="mt-2 text-sm text-gray-500">{change}</p>}
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-white sm:h-14 sm:w-14 sm:text-2xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;