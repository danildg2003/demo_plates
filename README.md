# demo_plates

Мини-проект по номерным знакам. Сервис на NestJS, который хранит номера автомобилей (марка, буквенная и цифровая часть номера, срок действия) и отдает их списком с пагинацией.

База PostgreSQL, таблицы создаются миграциями TypeORM, доступ к API по JWT токену. Документация API в Swagger.

Эндпоинты:
- `POST /auth/token` - получить токен
- `GET /create/plates` - список номеров, параметры `PageInfo` (страница) и `PlatesQuantity` (сколько на странице)
- `POST /post/plates` - добавить номер
- `DELETE /delete/plates` - удалить номер, параметры `WordPlates` и `NumPlates`

## Запуск

Перед запуском скопировать `.env.example` в `.env` и вписать свои данные.

```
docker compose up -d
npm install
npm run migrations:run
npm run start:dev
```

В docker-compose только PostgreSQL (порт 5433), схема из `PLATES_SCHEMA` создается при первом старте контейнера. Сервис запускается локально.

Swagger: http://localhost:8080/api

## Автор

[Gek Danil](@danil34G)
