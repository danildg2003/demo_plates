import { ApiProperty } from '@nestjs/swagger';

export class NewPlatesBaseDTO {
  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 4 })
  pages: number;

  @ApiProperty({ example: 1 })
  pageNum: number;
}
