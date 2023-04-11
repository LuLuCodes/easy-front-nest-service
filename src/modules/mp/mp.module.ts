import { Module } from '@nestjs/common';
import { MpBasicController } from './basic/mp.basic.controller';
import { MpBasicService } from './basic/mp.basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [],
  controllers: [MpBasicController],
  providers: [MpBasicService, CacheService],
})
export class MpModule {}
