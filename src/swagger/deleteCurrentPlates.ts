import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeletePlatesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Удалить необходимые данные о номерном знаке` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Данные успешно удалены',
    }),
    ApiNotFoundResponse({
      description: 'Не удалось удалить данные',
    }),
    ApiForbiddenResponse({
      description: 'Недостаточно прав доступа',
    }),
  );
}
