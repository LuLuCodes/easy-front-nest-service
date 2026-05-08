import { resolve } from 'node:path';
import type { DataSourceOptions } from 'typeorm';

export interface MysqlConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

/**
 * Build a TypeORM DataSourceOptions object that NestJS (TypeOrmModule)
 * and the typeorm CLI both consume.
 *
 * Entities/migrations/subscribers paths are resolved against this file
 * so they work whether SWC compiles to ./api or ts-node executes from
 * ./src.
 */
export function buildTypeOrmOptions(conn: MysqlConnectionConfig): DataSourceOptions {
  return {
    type: 'mysql',
    host: conn.host,
    port: conn.port,
    username: conn.username,
    password: conn.password,
    database: conn.database,
    timezone: '+08:00',
    charset: 'utf8mb4',
    entities: [resolve(__dirname, '../entities/*.entity{.ts,.js}')],
    migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
    subscribers: [resolve(__dirname, './subscribers/*.subscriber{.ts,.js}')],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    extra: {
      connectionLimit: 20,
      dateStrings: true,
      decimalNumbers: true,
    },
  };
}
