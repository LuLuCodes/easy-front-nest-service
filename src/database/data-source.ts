import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';
import { buildTypeOrmOptions } from './typeorm.config';

const ENV_PATH =
  process.env.NODE_ENV === 'production'
    ? resolve(__dirname, '../../.env')
    : resolve(__dirname, '../.env');
dotenv.config({ path: ENV_PATH });

export const AppDataSource = new DataSource(
  buildTypeOrmOptions({
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? '',
  }),
);

export default AppDataSource;
