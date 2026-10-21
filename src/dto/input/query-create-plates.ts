import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryPlatesInputDTO {
  @ApiPropertyOptional({
    description: 'Страница',
  })
  @IsOptional()
  // Значение по умолчанию только для пустого параметра: 0 и не-числа должны падать на валидации
  @Transform(({ value, obj, key }) => {
    if ((obj as Record<string, unknown>)[key] === '') {
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
  @Transform(({ value, obj, key }) => {
    if ((obj as Record<string, unknown>)[key] === '') {
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
