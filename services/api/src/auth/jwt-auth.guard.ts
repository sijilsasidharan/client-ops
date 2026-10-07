import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = this.jwtService.verify(token);
      console.log('Decoded JWT:', decoded);
      request.user = decoded;
      return Promise.resolve(true);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
