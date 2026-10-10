import { z } from "zod";

export const dashboardSchema = z.object({
  hoursThisWeek: z.number().optional(),
  unpaidInvoicesCount: z.number().optional(),
  unpaidInvoicesTotal: z.number().optional(),
  activeProjectsCount: z.number().optional(),
});

export type DashboardData = z.infer<typeof dashboardSchema>;
