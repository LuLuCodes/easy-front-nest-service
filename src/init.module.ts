import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@service/cache.service';
import { WXPayCoreFactory } from '@easy-front-core-sdk/wxpay';
import * as fs from 'fs';
import { resolve } from 'path';
import { DictCacheService } from '@service/dict-cache.service';

@Module({
  imports: [],
  providers: [CacheService, DictCacheService],
})
export class InitModule implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly dictCacheService: DictCacheService,
  ) {}
  async onModuleInit(): Promise<void> {
    // await this.initWX();
    // await this.initMP();
    // await this.initWXPay();
  }
  async initWXPay(): Promise<void> {
    const dict_list = await this.dictCacheService.getDictConf('微信支付配置');
    const folderPath = resolve(__dirname, '../../../cert/wx-pay');
    for (const wx of dict_list) {
      if (!wx.field_value) {
        console.error(`微信支付配置异常[id=${wx.id}]`);
        continue;
      }

      try {
        const {
          mchid,
          apisecret,
          api3secret,
          serial_no,
          plat_serial_no,
          notify_url,
          refund_notify_url,
          recharge_notify_url,
          wx_open_appid,
        } = JSON.parse(wx.field_value);

        WXPayCoreFactory.putCore({
          mchId: mchid,
          apiScrect: apisecret,
          api3Screct: api3secret,
          serialNo: serial_no,
          key: fs.readFileSync(`${folderPath}/${mchid}_key.pem`),
          platSerialNo: plat_serial_no,
        });

        // this.cacheService.set(
        //   `${CacheKey.WX_PAY_NOTIFY_URL}_${wx_pay_mchid}`,
        //   wx_pay_notify_url,
        // );
        // this.cacheService.set(
        //   `${CacheKey.WX_PAY_REFUND_NOTIFY_URL}_${wx_pay_mchid}`,
        //   wx_pay_refund_notify_url,
        // );
        // this.cacheService.set(
        //   `${CacheKey.WX_PAY_RECHARGE_NOTIFY_URL}_${wx_pay_mchid}`,
        //   wx_pay_recharge_notify_url,
        // );
        // this.cacheService.set(
        //   `${CacheKey.WX_OPEN_APPID}_${wx_pay_mchid}`,
        //   wx_open_appid,
        // );

        console.log(`加载微信支付配置：${mchid}`);
      } catch (error) {
        console.error(`加载微信支付配置：异常[id=${wx.id}]，${error.message}`);
      }
    }
  }
}
