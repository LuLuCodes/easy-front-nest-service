import { Module } from '@nestjs/common';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { CacheService } from '@service/cache.service';
import { SmsCoreService } from '@service/sms-core.service';
import { DictCacheService } from '@service/dict-cache.service';

@Module({
  imports: [],
  controllers: [BasicController],
  providers: [BasicService, CacheService, SmsCoreService, DictCacheService],
})
export class BasicModule {}
