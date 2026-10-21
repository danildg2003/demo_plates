import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  password: string;
}
