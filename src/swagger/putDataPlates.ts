import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function PutNewDataSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Записать новые данные` }),
    ApiBearerAuth('Access Token'),
    ApiCreatedResponse({
      description: 'Данные успешно зарегистрированы',
    }),
    ApiBadRequestResponse({
      description: 'Не удалось зарегистрировать данные',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
  );
}
