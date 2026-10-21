import { ApiProperty } from '@nestjs/swagger';

export class PlatesDTO {
  @ApiProperty({ example: '3f1c2b9e-8a4d-4c6e-9b1a-2d7e5f0c4a11' })
  id: string;

  @ApiProperty({ example: 'Toyota' })
  nameCar: string;

  @ApiProperty({ example: 'ABC' })
  WordPlates: string;

  @ApiProperty({ example: 123 })
  NumPlates: number;
}
