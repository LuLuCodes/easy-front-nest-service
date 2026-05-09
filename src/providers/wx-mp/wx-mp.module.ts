import { Module } from '@nestjs/common';

import { WxMpAccessTokenStore } from '@providers/wx-shared/access-token.store';

import { WxMpController } from './wx-mp.controller';
import { WxMpProvider } from './wx-mp.provider';

@Module({
  controllers: [WxMpController],
  providers: [WxMpProvider, WxMpAccessTokenStore],
  exports: [WxMpProvider],
})
export class WxMpModule {}
