import { ApiProperty } from '@nestjs/swagger';
import { PlatesDTO } from './plates.dto';

export class PlatesBaseDTO {
  @ApiProperty({ example: '1' })
  total: number;

  @ApiProperty({ example: '2' })
  pages: number;

  @ApiProperty({ example: '3' })
  pageNum: number;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['nameCar: string', 'WordPlates: string', 'NumPlates: number'],
  })
  items: PlatesDTO[];
}
