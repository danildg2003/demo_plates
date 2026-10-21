import { ApiProperty } from '@nestjs/swagger';

export class PlatesDTO {
  @ApiProperty({ example: '123' })
  id: number;

  @ApiProperty({ example: 'abc' })
  nameCar: string;

  @ApiProperty({ example: 'ABC' })
  WordPlates: string;

  @ApiProperty({ example: '123' })
  NumPlates: number;
}
