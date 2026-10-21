import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
