import { Module } from '@nestjs/common';
import { WxBasicController } from './basic/wx.basic.controller';
import { WxBasicService } from './basic/wx.basic.service';
import { CacheService } from '@service/cache.service';
import { WxMediaController } from './media/wx.media.controller';
import { WxMediaService } from './media/wx.media.service';

@Module({
  imports: [],
  controllers: [WxBasicController, WxMediaController],
  providers: [WxBasicService, WxMediaService, CacheService],
})
export class WxModule {}
