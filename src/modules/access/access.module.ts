import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { CacheService } from '@service/cache.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'op-log',
    }),
    ConfigModule,
  ],
  controllers: [AccessController],
  providers: [AccessService, CacheService],
  exports: [AccessService],
})
export class AccessModule {}
