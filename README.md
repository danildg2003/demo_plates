## Project setup

Node.js 20–24 (LTS). On Node 25 `jsonwebtoken` fails to load.

```bash
$ npm install

# fill in your own values (.env is not committed)
$ cp .env.example .env

# start PostgreSQL (schema from PLATES_SCHEMA is created on first start)
$ docker compose up -d

# create tables
$ npm run migrations:run
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Clone local repository to GitHub
```bash
Remember, before you start the commands below, you need to create repository on GitHub

# initialize repository
$ git init

# take all files and changes on it
$ git add .

# commit this commits and comment
$ git commit -m 'your-comment'

# connect remote repository to local by name, that you sent
$ git remote add 'YOUR-URL-REPOSITORY-GITHUB'

# push commits to current repository
$ git push
```

## Refresh repository
```bash
# take all commits
$ git add .

# commit this commits and comment
$ git commit -m 'your-comment'

# push commits to current repository
$ git push
```

## Migration
```javascript
/**
In your current project, create a special folder for database and migration (optionally)
I'm using the folder like this: src/database/..
Config your package.json scripts
*/

"scripts": {
"typeorm": "ts-node ./node_modules/typeorm/cli",
"migrations:run": "typeorm-ts-node-commonjs migration:run -d ./your-path/data-source.ts",
"migrations:revert": "typeorm-ts-node-commonjs migration:revert -d ./src/your-path/data-source.ts",
"migrations:generate": "typeorm-ts-node-commonjs migration:generate ./src/your-path/migrations/migration_name -d ./src/your-path/data-source.ts"
}
```
```typescript
/**After this on 'your-path' create folder with 'data-source.ts':
*/
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { your-entity-file } from '../your-path-to-entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',  // or another database
  host: process.env.'your-db-host',
  username: process.env.'your-db-user',
  password: process.env.'your-db-password',
  database: process.env.'your-db',
  port: Number(process.env.'your-db-port'),
  schema: process.env.'your-db-schema',
  synchronize: false,
  entities: ['your-entity-file'],
  logging: false,
  migrations: [__dirname + `/migrations/**/*{.ts,.js}`],
 });
```
```typescript
/**
Now we can use the migration
*/

/**
Generate the migration
*/
$ npm run migrations:generate --name=migration_name

/**
Or u can create empty migration and use hardcode :)
*/
$ typeorm migration:create

/**Run migration
*/
$ npm run migration:run
```
```
Finally, it should look like this:
![Result of migration.png](Result of migration);
```
## Stay in touch
- Author - [Gek Danil](@danil34G)
