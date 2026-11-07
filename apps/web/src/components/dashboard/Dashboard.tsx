"use client";

import { useDashboard } from "@/hooks/useDashboard";
import DashboardCard from "./DashboardCard";

export const Dashboard = () => {
  const { data, isPending, isError, error } = useDashboard();
  return (
    <>
      {isPending ? (
        <div>Loading dashboard data…</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(data).map(([key, value]) => (
              <DashboardCard key={key} title={key} value={value} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
