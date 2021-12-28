import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WxPayBasicController } from './basic/wx.pay.basic.controller';
import { WxPayBasicService } from './basic/wx.pay.basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [ConfigModule],
  controllers: [WxPayBasicController],
  providers: [WxPayBasicService, CacheService],
})
export class WxPayModule {}
