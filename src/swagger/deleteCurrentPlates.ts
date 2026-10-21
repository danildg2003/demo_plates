import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function DeletePlatesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Удалить необходимые данные о номерном знаке` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Данные успешно удалены',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
    }),
    ApiNotFoundResponse({
      description: 'Не удалось удалить данные',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
  );
}
