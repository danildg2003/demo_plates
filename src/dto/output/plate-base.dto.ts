import { ApiProperty } from '@nestjs/swagger';
import { PlatesDTO } from './plates.dto';

export class PlatesBaseDTO {
  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 4 })
  pages: number;

  @ApiProperty({ example: 1 })
  pageNum: number;

  @ApiProperty({ type: PlatesDTO, isArray: true })
  items: PlatesDTO[];
}
