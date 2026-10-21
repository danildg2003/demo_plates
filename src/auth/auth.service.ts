import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUserAndGetToken(username: string, password: string) {
    if (username !== 'admin' || password !== '1234') {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { username };

    return { access_token: this.jwtService.sign(payload) };
  }
}
