// jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token no encontrado');

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      req['user'] = decoded;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
