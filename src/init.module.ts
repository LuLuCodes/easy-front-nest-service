import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService } from '@service/cache.service';
import { InjectModel } from '@nestjs/sequelize';
import { DBModule } from './db.module';
import { CacheKey } from '@config/global';
import { Op } from 'sequelize';
import { TThirdPlatformConfig } from '@models/TThirdPlatformConfig';
import { MPCoreFactory } from '@easy-front-core-sdk/miniprogram';
import { WXCoreFactory } from '@easy-front-core-sdk/wx';
import { WXPayCoreFactory } from '@easy-front-core-sdk/wxpay';
import * as fs from 'fs';
import { resolve } from 'path';

@Module({
  imports: [DBModule, ConfigModule],
  providers: [CacheService],
})
export class InitModule implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    @InjectModel(TThirdPlatformConfig)
    private readonly thirdPlatformConfig: typeof TThirdPlatformConfig,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.initWX();
    await this.initMP();
    await this.initWXPay();
  }
  async initWX(): Promise<void> {
    const wx_list = await this.thirdPlatformConfig.findAll({
      attributes: ['id', 'wx_appid', 'wx_appsecret', 'wx_token'],
      where: {
        enabled: 1,
        deleted: 0,
        wx_appid: {
          [Op.not]: null,
        },
        wx_appsecret: {
          [Op.not]: null,
        },
        wx_token: {
          [Op.not]: null,
        },
      },
      raw: true,
    });
    for (const wx of wx_list) {
      const { wx_appid, wx_appsecret, wx_token } = wx;
      WXCoreFactory.putCore(
        { appId: wx_appid, appScrect: wx_appsecret, token: wx_token },
        {
          host: this.configService.get('redis.host'),
          port: this.configService.get('redis.port'),
          db: this.configService.get('cache.redis_db'),
        },
      );
    }
  }
  async initMP(): Promise<void> {
    const mp_list = await this.thirdPlatformConfig.findAll({
      attributes: ['id', 'wx_miniprogram_appid', 'wx_miniprogram_appsecret'],
      where: {
        enabled: 1,
        deleted: 0,
        wx_miniprogram_appid: {
          [Op.not]: null,
        },
        wx_miniprogram_appsecret: {
          [Op.not]: null,
        },
      },
      raw: true,
    });
    for (const mp of mp_list) {
      const { wx_miniprogram_appid, wx_miniprogram_appsecret } = mp;
      MPCoreFactory.putCore(
        {
          appId: wx_miniprogram_appid,
          appScrect: wx_miniprogram_appsecret,
        },
        {
          host: this.configService.get('redis.host'),
          port: this.configService.get('redis.port'),
          db: this.configService.get('cache.redis_db'),
        },
      );
    }
  }
  async initWXPay(): Promise<void> {
    const wx_pay_list = await this.thirdPlatformConfig.findAll({
      attributes: [
        'id',
        'wx_pay_mchid',
        'wx_pay_apisecret',
        'wx_pay_api3secret',
        'wx_pay_serial_no',
        'wx_pay_plat_serial_no',
        'wx_pay_notify_url',
        'wx_pay_refund_notify_url',
        'wx_pay_recharge_notify_url',
        'wx_open_appid',
      ],
      where: {
        enabled: 1,
        deleted: 0,
        wx_pay_mchid: {
          [Op.not]: null,
        },
        wx_pay_apisecret: {
          [Op.not]: null,
        },
        wx_pay_api3secret: {
          [Op.not]: null,
        },
        wx_pay_serial_no: {
          [Op.not]: null,
        },
        wx_pay_plat_serial_no: {
          [Op.not]: null,
        },
      },
      raw: true,
    });

    // const folderPath = resolve(__dirname, '../../../cert/wx-pay');
    // for (const wx of wx_pay_list) {
    //   const {
    //     wx_pay_mchid,
    //     wx_pay_apisecret,
    //     wx_pay_api3secret,
    //     wx_pay_serial_no,
    //     wx_pay_plat_serial_no,
    //     wx_pay_notify_url,
    //     wx_pay_refund_notify_url,
    //     wx_pay_recharge_notify_url,
    //     wx_open_appid,
    //   } = wx;
    //   WXPayCoreFactory.putCore({
    //     mchId: wx_pay_mchid,
    //     apiScrect: wx_pay_apisecret,
    //     api3Screct: wx_pay_api3secret,
    //     serialNo: wx_pay_serial_no,
    //     key: fs.readFileSync(`${folderPath}/${wx_pay_mchid}_key.pem`),
    //     platSerialNo: wx_pay_plat_serial_no,
    //   });
    //   this.cacheService.set(
    //     `${CacheKey.WX_PAY_NOTIFY_URL}_${wx_pay_mchid}`,
    //     wx_pay_notify_url,
    //   );
    //   this.cacheService.set(
    //     `${CacheKey.WX_PAY_REFUND_NOTIFY_URL}_${wx_pay_mchid}`,
    //     wx_pay_refund_notify_url,
    //   );
    //   this.cacheService.set(
    //     `${CacheKey.WX_PAY_RECHARGE_NOTIFY_URL}_${wx_pay_mchid}`,
    //     wx_pay_recharge_notify_url,
    //   );
    //   this.cacheService.set(
    //     `${CacheKey.WX_OPEN_APPID}_${wx_pay_mchid}`,
    //     wx_open_appid,
    //   );
    // }
  }
}
