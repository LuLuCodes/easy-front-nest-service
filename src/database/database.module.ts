import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Dictionary,
  SmsLog,
  User,
  UserLogin,
  UserOplog,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { AuditFieldsSubscriber } from './subscribers/audit-fields.subscriber';
import { buildTypeOrmOptions } from './typeorm.config';

const ENTITIES = [
  Dictionary,
  SmsLog,
  User,
  UserLogin,
  UserOplog,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        buildTypeOrmOptions({
          host: config.get<string>('mysql.host')!,
          port: config.get<number>('mysql.port')!,
          username: config.get<string>('mysql.username')!,
          password: config.get<string>('mysql.password')!,
          database: config.get<string>('mysql.database')!,
        }),
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: [AuditFieldsSubscriber],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
