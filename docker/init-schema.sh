#!/bin/sh
set -e

# Схема должна существовать до запуска миграций: TypeORM создаёт в ней таблицу migrations
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  -c "CREATE SCHEMA IF NOT EXISTS \"${PLATES_SCHEMA:-plates}\";"
