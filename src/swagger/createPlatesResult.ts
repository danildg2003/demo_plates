// здесь будет показано просто выведение данных по нескольким query
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PlatesBaseDTO } from '../dto/output/plate-base.dto';

export function CreatePlatesResultSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Получить список номерных знаков` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Информация найдена',
      type: PlatesBaseDTO,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
    }),
    ApiNotFoundResponse({
      description: 'Информация не найдена',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
  );
}
