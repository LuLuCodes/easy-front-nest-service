import { Module } from '@nestjs/common';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [],
  controllers: [BasicController],
  providers: [BasicService, CacheService],
})
export class BasicModule {}
