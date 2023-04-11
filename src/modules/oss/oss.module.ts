/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-02-02 18:51:04
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 18:52:31
 * @FilePath: /easy-front-nest-service/src/modules/oss/oss.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OssController } from './oss.controller';
import { CacheService } from '@service/cache.service';
import { AliOssModule } from 'nestjs-ali-oss';

@Module({
  imports: [
    AliOssModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          region: configService.get('oss.region_id'),
          accessKeyId: configService.get('oss.access_key_id'),
          accessKeySecret: configService.get('oss.access_key_secret'),
          bucket: configService.get('oss.bucket_name'),
          end_point: configService.get('oss.end_point'),
          internal: configService.get('oss.internal') === 1, // 是否使用阿里云内部网访问
          secure: true, // 使用 HTTPS
          timeout: configService.get('oss.timeout'),
        };
      },
    }),
  ],
  controllers: [OssController],
  providers: [CacheService],
})
export class OssModule {}
