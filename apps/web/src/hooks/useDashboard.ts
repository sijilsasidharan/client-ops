import { useQuery } from "@tanstack/react-query";
import { DashboardApi as dashboardApi } from "@/lib/api/dashboard";

export const useDashboard = () =>
  useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.getDashboardData });
