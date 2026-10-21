import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function PutNewDataSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Записать новые данные` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Данные успешно зарегистрированы',
    }),
    ApiNotFoundResponse({
      description: 'Не удалось зарегистрировать данные',
    }),
    ApiForbiddenResponse({
      description: 'Недостаточно прав доступа',
    }),
  );
}
