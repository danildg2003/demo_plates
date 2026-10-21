import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserAndGetToken(username: string, password: string) {
    if (
      username !== this.configService.getOrThrow<string>('AUTH_USERNAME') ||
      password !== this.configService.getOrThrow<string>('AUTH_PASSWORD')
    ) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
