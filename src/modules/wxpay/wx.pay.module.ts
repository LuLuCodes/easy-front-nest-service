/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-02-02 18:51:04
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 18:51:44
 * @FilePath: /easy-front-nest-service/src/modules/wxpay/wx.pay.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { WxPayBasicController } from './basic/wx.pay.basic.controller';
import { WxPayBasicService } from './basic/wx.pay.basic.service';
import { CacheService } from '@service/cache.service';

@Module({
  imports: [],
  controllers: [WxPayBasicController],
  providers: [WxPayBasicService, CacheService],
})
export class WxPayModule {}
