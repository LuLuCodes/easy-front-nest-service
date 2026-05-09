import { Module } from '@nestjs/common';

import { WxAccessTokenStore } from './access-token.store';
import { WxOaController } from './wx-oa.controller';
import { WxOaProvider } from './wx-oa.provider';

@Module({
  controllers: [WxOaController],
  providers: [WxOaProvider, WxAccessTokenStore],
  exports: [WxOaProvider],
})
export class WxOaModule {}
