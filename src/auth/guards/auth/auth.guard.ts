import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      if (user.isAdmin) {
        user.roles = ['admin'];
      } else {
        user.roles = ['user'];
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
