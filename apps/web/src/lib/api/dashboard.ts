import { apiFetch } from "../api-client";
import { DashboardData } from "../schemas/dashboard";

export const DashboardApi = {
  getDashboardData: async () => apiFetch<DashboardData>("/api/dashboard"),
};
