import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule], // <-- this is what resolves JwtService for the guard
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
