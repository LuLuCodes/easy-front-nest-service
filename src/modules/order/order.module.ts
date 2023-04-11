/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-02-02 18:51:04
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-02-16 15:54:22
 * @FilePath: /easy-front-nest-service/src/modules/order/order.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CacheService } from '@service/cache.service';
import { MqClientService } from '@service/mq.client.service';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'order-timeout-close-queue',
      prefix: 'ef',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, CacheService, MqClientService],
})
export class OrderModule {}
