import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../../db.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CacheService } from '@service/cache.service';
import { MqClientService } from '@service/mq.client.service';

@Module({
  imports: [
    DBModule,
    ConfigModule,
    BullModule.registerQueue({
      name: 'order-timeout-close-queue',
      prefix: 'ef',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, CacheService, MqClientService],
})
export class OrderModule {}
