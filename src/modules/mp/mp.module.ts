import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MpBasicController } from './basic/mp.basic.controller';
import { MpBasicService } from './basic/mp.basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [ConfigModule],
  controllers: [MpBasicController],
  providers: [MpBasicService, CacheService],
})
export class MpModule {}
