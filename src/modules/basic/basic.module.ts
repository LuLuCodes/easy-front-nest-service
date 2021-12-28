import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../../db.module';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [DBModule, ConfigModule],
  controllers: [BasicController],
  providers: [BasicService, CacheService],
})
export class BasicModule {}
