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
import { MqClientService } from '@service/mq.client.service';
import { HttpService } from '@service/http.service';

import { InitModule } from './init.module';
import { WxModule } from './modules/wx/wx.module';
import { MpModule } from './modules/mp/mp.module';
import { WxPayModule } from './modules/wxpay/wx.pay.module';
import { OssModule } from './modules/oss/oss.module';
import { CustomerModule } from './modules/customer/customer.module';
import { GoodsModule } from './modules/goods/goods.module';
import { OrderModule } from './modules/order/order.module';
import { BasicModule } from './modules/basic/basic.module';

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
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
      exclude: ['/api*'],
    }),
    HttpModule.registerAsync({
      useClass: HttpService,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          closeClient: true,
          config: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            db: configService.get('redis.cache_db_index'),
          },
        };
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
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
            defaultScope: {
              where: {
                deleted: 0,
              },
            },
            hooks: {
              beforeCreate(attributes: any, options: any) {
                const { fields } = options;
                const now = Date.now();
                if (
                  !attributes.dataValues.create_time &&
                  fields.indexOf('create_time') !== -1
                ) {
                  attributes.dataValues.create_time = now;
                }
                if (
                  !attributes.dataValues.update_time &&
                  fields.indexOf('update_time') !== -1
                ) {
                  attributes.dataValues.update_time = now;
                }
              },
              beforeBulkCreate(instances: any, options: any) {
                const { fields } = options;
                const now = Date.now();
                for (const instance of instances) {
                  if (
                    !instance.dataValues.create_time &&
                    fields.indexOf('create_time') !== -1
                  ) {
                    instance.dataValues.create_time = now;
                  }
                  if (
                    !instance.dataValues.update_time &&
                    fields.indexOf('update_time') !== -1
                  ) {
                    instance.dataValues.update_time = now;
                  }
                }
              },
              beforeUpdate(instance: any, options: any) {
                const { fields } = options;
                const now = Date.now();
                if (
                  !instance.dataValues.create_time &&
                  fields.indexOf('update_time') !== -1
                ) {
                  instance.dataValues.update_time = now;
                }
              },
              beforeBulkUpdate(options: any) {
                const { attributes, fields } = options;
                fields.push('update_time');
                attributes.update_time = Date.now();
              },
            },
          },
          dialectOptions: {
            decimalNumbers: true,
            multipleStatements: true,
          },
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          db: configService.get('redis.queue_db_index'),
        },
      }),
    }),
    WxModule,
    MpModule,
    WxPayModule,
    OssModule,
    CustomerModule,
    GoodsModule,
    OrderModule,
    BasicModule,
    // CloudInitModule, // 云端全局变量初始化
    InitModule,
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
    MqClientService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
