import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { SequelizeModule } from '@nestjs/sequelize';
import { join, resolve } from 'path';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { SignGuard } from '@guard/sign.guard';
import { AuthGuard } from '@guard/auth.guard';
import { CacheService } from '@service/cache.service';
import { CronTaskService } from '@service/cron-task.service';
import { DictCacheService } from '@service/dict-cache.service';

import { DBModule } from './db.module';
import { InitModule } from './init.module';
import { WxModule } from './modules/wx/wx.module';
import { MpModule } from './modules/mp/mp.module';
import { WxPayModule } from './modules/wxpay/wx.pay.module';
import { OssModule } from './modules/oss/oss.module';
import { BasicModule } from './modules/basic/basic.module';
import { AccessModule } from './modules/access/access.module';
import { OpLogModule } from './modules/oplog/oplog.module';

import app_config from '@config/app';
import databse_config from '@config/mysql';
import mq_config from '@config/mq';
import oss_config from '@config/oss';
import redis_config from '@config/redis';
import session_config from '@config/session';
import while_list from '@config/white-list';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        app_config,
        databse_config,
        mq_config,
        oss_config,
        redis_config,
        session_config,
        while_list,
      ],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
      exclude: ['/api*'],
    }),
    HttpModule.registerAsync({
      useFactory: async () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    RedisModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          closeClient: true,
          config: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            password: configService.get('redis.password'),
            db: configService.get('redis.cache_db_index'),
          },
        };
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          database: configService.get('mysql.database'),
          timezone: '+08:00',
          pool: {
            max: 20,
            min: 5,
            acquire: 60000,
            idle: 10000,
          },
          modelPaths: [resolve(__dirname, './models', '**/!(index).{ts,js}')],
          retryAttempts: 3, // 数据链接重试次数
          retryDelay: 2000, // 连接重试尝试之间的延迟(ms)
          logQueryParameters: true,
          define: {
            hooks: {
              beforeCreate(attributes: any, options: any) {
                const { fields } = options;
                if (
                  !attributes.dataValues.created_by &&
                  fields.includes('created_by')
                ) {
                  // attributes.dataValues.created_by = 1;
                  throw new Error(`缺少created_by字段`);
                }
                if (
                  !attributes.dataValues.updated_by &&
                  fields.includes('updated_by')
                ) {
                  attributes.dataValues.updated_by =
                    attributes.dataValues.created_by;
                }
                // 注入app_id
                // attributes.dataValues.app_id = configService.get('app.app_id');
              },
              beforeBulkCreate(instances: any, options: any) {
                const { fields } = options;
                for (const instance of instances) {
                  if (
                    !instance.dataValues.created_by &&
                    fields.includes('created_by')
                  ) {
                    // instance.dataValues.created_by = 1;
                    throw new Error(`缺少created_by字段`);
                  }
                  if (
                    !instance.dataValues.updated_by &&
                    fields.includes('updated_by')
                  ) {
                    instance.dataValues.updated_by =
                      instance.dataValues.created_by;
                  }
                  // 注入app_id
                  // instance.dataValues.app_id = configService.get('app.app_id');
                }
              },
              beforeBulkDestroy(options: any) {
                if (!options.deleted_by) {
                  throw new Error(`缺少deleted_by字段`);
                }
              },
              beforeUpdate(instance: any, options: any) {
                console.log(options);
                const { fields } = options;
                if (
                  !instance.dataValues.updated_by &&
                  fields.includes('updated_by')
                ) {
                  throw new Error(`缺少updated_by字段`);
                }
                delete instance.dataValues.created_by;
              },
              beforeBulkUpdate(options: any) {
                const { attributes, fields } = options;
                if (!attributes.updated_by) {
                  throw new Error(`缺少updated_by字段`);
                }
                if (fields.includes('deleted_by')) {
                  delete attributes.updated_at;
                }
                delete attributes.created_by;
              },
              async afterBulkDestroy(options: any) {
                await options.model.update(
                  {
                    updated_by: options.deleted_by,
                    deleted_by: options.deleted_by,
                  },
                  {
                    where: options.where,
                    paranoid: false,
                    transaction: options.transaction,
                  },
                );
              },
            },
          },
          dialectOptions: {
            decimalNumbers: true,
            maxPreparedStatements: 100,
            multipleStatements: true,
            dateStrings: true,
            typeCast: function (field, next) {
              // for reading from database
              if (field.type === 'DATETIME') {
                return field.string();
              }
              return next();
            },
          },
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
          db: configService.get('redis.queue_db_index'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'api-log',
    }),
    BullModule.registerQueue({
      name: 'op-log',
    }),
    DBModule,
    WxModule,
    MpModule,
    WxPayModule,
    OssModule,
    AccessModule,
    BasicModule,
    InitModule,
    OpLogModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SignGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CacheService,
    CronTaskService,
    DictCacheService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
