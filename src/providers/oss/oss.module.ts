import { Module } from '@nestjs/common';

import { OssController } from './oss.controller';
import { OssProvider } from './oss.provider';

@Module({
  controllers: [OssController],
  providers: [OssProvider],
  exports: [OssProvider],
})
export class OssModule {}
