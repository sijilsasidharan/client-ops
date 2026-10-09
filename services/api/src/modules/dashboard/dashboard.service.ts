import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

function getStartOfWeek(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0 (Sun) – 6 (Sat)
  const diff = (day === 0 ? -6 : 1) - day; // shift back to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async getDashboardData(organizationId: string) {
    // Implement logic to fetch and return dashboard data

    const startOfWeek = getStartOfWeek();

    const [weekEntries, unpaidInvoices, activeProjectsCount] =
      await Promise.all([
        // Fetch total clients for the organization
        this.prisma.timeEntry.findMany({
          where: {
            organizationId,
            startTime: { gte: startOfWeek },
            endTime: { not: null },
          },
          select: { startTime: true, endTime: true },
        }),

        this.prisma.invoice.findMany({
          where: { organizationId, status: { in: ['DRAFT', 'SENT'] } },
          select: { totalAmount: true },
        }),

        this.prisma.project.count({
          where: { organizationId, status: 'ACTIVE' },
        }),
      ]);

    const hoursThisWeek = weekEntries.reduce(
      (sum, e) =>
        sum + (e.endTime!.getTime() - e.startTime.getTime()) / 3_600_000,
      0,
    );
    const unpaidInvoicesTotal = unpaidInvoices.reduce(
      (sum, inv) => sum + Number(inv.totalAmount),
      0,
    );

    return {
      hoursThisWeek: Math.round(hoursThisWeek * 100) / 100,
      unpaidInvoicesCount: unpaidInvoices.length,
      unpaidInvoicesTotal,
      activeProjectsCount,
    };
  }
}
