import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class PlatesAccess implements CanActivate {
  private readonly logger = new Logger(PlatesAccess.name);
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      this.logger.warn('Токен отсутствует');
      throw new UnauthorizedException('Токен отсутствует');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as any).user = payload;
      return true;
    } catch (error) {
      this.logger.warn(`Ошибка проверки токена: ${error.message}`);
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
