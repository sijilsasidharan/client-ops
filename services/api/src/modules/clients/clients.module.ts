import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ClientsController } from './clients.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [],
})
export class ClientsModule {}
