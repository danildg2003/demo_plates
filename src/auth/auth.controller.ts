import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/input/login-dto-swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async getToken(@Body() body: LoginDto) {
    return this.authService.validateUserAndGetToken(
      body.username,
      body.password,
    );
  }
}
