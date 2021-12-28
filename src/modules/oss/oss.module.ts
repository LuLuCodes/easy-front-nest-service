import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OssController } from './oss.controller';
import { CacheService } from '@service/cache.service';
import { AliOssModule } from 'nestjs-ali-oss';

@Module({
  imports: [
    ConfigModule,
    AliOssModule.registerAsync({
      imports: [ConfigModule],
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
