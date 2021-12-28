import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../../db.module';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [DBModule, ConfigModule],
  controllers: [GoodsController],
  providers: [GoodsService, CacheService],
})
export class GoodsModule {}
