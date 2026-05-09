import { Module } from '@nestjs/common';

import { WxOaAccessTokenStore } from '@providers/wx-shared/access-token.store';

import { WxOaController } from './wx-oa.controller';
import { WxOaProvider } from './wx-oa.provider';

@Module({
  controllers: [WxOaController],
  providers: [WxOaProvider, WxOaAccessTokenStore],
  exports: [WxOaProvider],
})
export class WxOaModule {}
