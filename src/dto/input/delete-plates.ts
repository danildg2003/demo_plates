import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { LineValidation } from '../../common/validates/validate-line';

export class DeletePlatesDTO {
  @ApiProperty({
    description: 'Буквы номерного знака',
  })
  @IsString()
  @Length(1, 3)
  @Validate(LineValidation)
  WordPlates: string;

  @ApiProperty({
    description: 'Цифры номерного знака',
  })
  @Type(() => Number)
  @IsInt()
  NumPlates: number;
}
