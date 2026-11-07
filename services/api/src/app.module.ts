import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ClientsModule } from './modules/clients/clients.module';
import { TimeEntryModule } from './modules/time-entries/time-emtry.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

@Module({
  imports: [
    DashboardModule,
    HealthModule,
    AuthModule,
    ClientsModule,
    TimeEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
