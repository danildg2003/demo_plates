// здесь будет показано просто выведение данных по нескольким query
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function CreatePlatesResultSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Ввести данные о номере авто` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Информация найдена',
    }),
    ApiNotFoundResponse({
      description: 'Информация не найдена',
    }),
    ApiForbiddenResponse({
      description: 'Недостаточно прав доступа',
    }),
  );
}
