import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Plates } from '../plates/plates.entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PLATES_HOST,
  username: process.env.PLATES_USER,
  password: process.env.PLATES_PASSWORD,
  database: process.env.PLATES_DATABASE,
  port: Number(process.env.PLATES_PORT),
  schema: process.env.PLATES_SCHEMA,
  synchronize: false,
  entities: [Plates],
  logging: false,
  migrations: [__dirname + `/migrations/**/*{.ts,.js}`],
});
