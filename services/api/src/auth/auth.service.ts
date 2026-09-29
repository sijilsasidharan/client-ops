import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dts';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.prisma.$transaction(async (prisma) => {
      const organization = await prisma.organization.create({
        data: {
          name: dto.organizationName,
          slug: dto.organizationName.toLowerCase().replace(/\s+/g, '-'),
        },
      });

      const user = await prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      await prisma.membership.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'OWNER',
        },
      });
      return { organizationId: organization.id, userId: user.id };
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return { accessToken };
  }
}
