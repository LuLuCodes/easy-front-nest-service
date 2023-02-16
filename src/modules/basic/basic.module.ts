import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [ConfigModule],
  controllers: [BasicController],
  providers: [BasicService, CacheService],
})
export class BasicModule {}
