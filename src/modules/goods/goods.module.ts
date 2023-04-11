/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-02-02 18:51:04
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-02-16 15:54:04
 * @FilePath: /easy-front-nest-service/src/modules/goods/goods.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [],
  controllers: [GoodsController],
  providers: [GoodsService, CacheService],
})
export class GoodsModule {}
