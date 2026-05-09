import { Module } from '@nestjs/common';

import { WxPayController } from './wx-pay.controller';
import { WxPayProvider } from './wx-pay.provider';

@Module({
  controllers: [WxPayController],
  providers: [WxPayProvider],
  exports: [WxPayProvider],
})
export class WxPayModule {}
