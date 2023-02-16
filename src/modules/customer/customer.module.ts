/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-02-02 18:51:04
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-02-16 15:52:04
 * @FilePath: /easy-front-nest-service/src/modules/customer/customer.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [ConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService, CacheService],
})
export class CustomerModule {}
