import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { OpLogService } from './oplog.service';
import { CacheService } from '@service/cache.service';
import { OpLogController } from './oplog.controller';
import { OpLogProcessor } from './oplog.processor';
@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'op-log',
    }),
    ConfigModule,
    HttpModule,
  ],
  controllers: [OpLogController],
  providers: [OpLogService, CacheService, OpLogProcessor],
  exports: [OpLogService],
})
export class OpLogModule {}
