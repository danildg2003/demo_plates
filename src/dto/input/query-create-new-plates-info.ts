import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateNewPlatesDTO {
  @ApiProperty({ example: 'Toyota', description: 'Марка машины' })
  @IsOptional()
  nameCar: string;

  @ApiProperty({ example: 'ABC', description: 'Буквенная часть номера' })
  @IsOptional()
  WordPlates: string;

  @ApiProperty({ example: '123', description: 'Цифровая часть номера' })
  @IsOptional()
  NumPlates: number;

  @ApiProperty({
    example: '2021-12-01 00:00:00.000 +0300',
    description: 'Дата начала действия',
  })
  CreatedAt: Date;

  @ApiProperty({
    example: '2029-12-01 00:00:00.000 +0300',
    description: 'Дата окончания действия',
  })
  ValidUntil: Date;
}
