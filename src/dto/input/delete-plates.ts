import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Validate } from 'class-validator';
import { LineValidation } from 'src/common/validates/validate-line';

export class DeletePlatesDTO {
  @ApiProperty({
    description: 'Буквы номерного знака',
  })
  @IsString()
  @Length(0, 3)
  @Validate(LineValidation)
  WordPlates: string;

  @ApiProperty({
    description: 'Цифры номерного знака',
  })
  @IsNumber()
  @Validate(LineValidation)
  NumPlates: number;
}
