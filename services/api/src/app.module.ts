import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ClientsModule } from './modules/clients/clients.module';
import { TimeEntryModule } from './modules/time-entries/time-emtry.module.js';

@Module({
  imports: [HealthModule, AuthModule, ClientsModule, TimeEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
