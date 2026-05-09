import { Module } from '@nestjs/common';

import { AlipayController } from './alipay.controller';
import { AlipayProvider } from './alipay.provider';

@Module({
  controllers: [AlipayController],
  providers: [AlipayProvider],
  exports: [AlipayProvider],
})
export class AlipayModule {}
