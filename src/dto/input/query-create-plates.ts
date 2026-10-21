import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryPlatesInputDTO {
  @ApiPropertyOptional({
    description: 'Страница',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return 1;
    }
    return value;
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  PageInfo: number = 1;

  @ApiPropertyOptional({
    description: 'Кол-во автомобилей',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return 3;
    }
    return value;
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  PlatesQuantity: number = 3;
}
