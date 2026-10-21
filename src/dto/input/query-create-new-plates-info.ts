import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LineValidation } from '../../common/validates/validate-line';

export class CreateNewPlatesDTO {
  @ApiProperty({ example: 'Toyota', description: 'Марка машины' })
  @IsString()
  @Validate(LineValidation)
  nameCar: string;

  @ApiProperty({ example: 'ABC', description: 'Буквенная часть номера' })
  @IsString()
  @Length(1, 3)
  @Validate(LineValidation)
  WordPlates: string;

  @ApiProperty({ example: 123, description: 'Цифровая часть номера' })
  @IsInt()
  NumPlates: number;

  @ApiPropertyOptional({
    example: '2021-12-01 00:00:00.000 +0300',
    description: 'Дата начала действия',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({
    example: '2029-12-01 00:00:00.000 +0300',
    description: 'Дата окончания действия',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ValidUntil?: Date;
}
