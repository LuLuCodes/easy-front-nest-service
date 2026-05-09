import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { join } from 'path';
import Redis from 'ioredis';

import { LoggerModule } from '@common/logger/logger.module';
import { RedisModule } from '@common/redis/redis.module';
import { DatabaseModule } from '@database/database.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@auth/guards/permissions.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { SignGuard } from '@guard/sign.guard';
import { CustomThrottlerGuard } from '@guard/custom-throttler.guard';
import { CacheService } from '@service/cache.service';
import { CronTaskService } from '@service/cron-task.service';
import { DictCacheService } from '@service/dict-cache.service';

import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { WxOaModule } from './providers/wx-oa/wx-oa.module';
import { InitModule } from './init.module';
import { MpModule } from './modules/mp/mp.module';
import { WxPayModule } from './modules/wxpay/wx.pay.module';
import { OssModule } from './modules/oss/oss.module';
import { BasicModule } from './modules/basic/basic.module';
import { AccessModule } from './modules/access/access.module';
import { OpLogModule } from './modules/oplog/oplog.module';

import app_config from '@config/app';
import auth_config from '@config/auth';
import databse_config from '@config/mysql';
import mq_config from '@config/mq';
import oss_config from '@config/oss';
import redis_config from '@config/redis';
import tenant_config from '@config/tenant';
import while_list from '@config/white-list';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        app_config,
        auth_config,
        databse_config,
        mq_config,
        oss_config,
        redis_config,
        tenant_config,
        while_list,
      ],
      isGlobal: true,
    }),
    LoggerModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get('app.throttle_ttl'),
            limit: configService.get('app.throttle_limit'),
          },
        ],
        storage: new ThrottlerStorageRedisService(
          new Redis({
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            password: configService.get('redis.password'),
            db: configService.get('redis.throttler_store_db_index'),
          }),
        ),
      }),
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
    RedisModule,
    TenantModule,
    DatabaseModule,
    BullModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
          db: configService.get('redis.queue_db_index'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'op-log',
    }),
    WxOaModule,
    MpModule,
    WxPayModule,
    OssModule,
    AuthModule,
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
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
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
