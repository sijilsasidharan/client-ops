import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async checkHealth(): Promise<{ status: string; db: string }> {
    await this.prisma.user.findMany({ take: 1 }); // Check database connectivity
    return { status: 'OK', db: 'Connected' };
  }
}
