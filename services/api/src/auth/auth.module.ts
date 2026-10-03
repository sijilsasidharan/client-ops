import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // <-- export AuthService and JwtModule so they can be used in other modules
})
export class AuthModule {}
