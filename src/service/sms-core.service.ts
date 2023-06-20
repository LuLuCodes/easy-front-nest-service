import { Injectable } from '@nestjs/common';
import { CacheService } from '@service/cache.service';
import { InjectModel } from '@nestjs/sequelize';
import { TSmsLog } from '@models/index';
import { SMS_CHHANEL, SMS_STATUS, SMS_TYPE } from '@dto/EnumDTO';
import { DictCacheService } from './dict-cache.service';
import { ISmsDictConf, SmsFactory } from '@libs/sms';
import * as dayjs from 'dayjs';
import { randomNo } from '@libs/util';

const SEND_KEY = `SEND_KEY`;
@Injectable()
export class SmsCoreService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly dictCacheService: DictCacheService,
    @InjectModel(TSmsLog)
    private readonly tSmsLog: typeof TSmsLog,
  ) {}

  /**
   * 发送短信，目前只支持阿里云
   * @param phones 发送手机号码，支持对多个手机号码发送短信，手机号码之间以半角逗号（,）分隔
   * @param sms_type 短信类型 验证码|通用，在字典表中【短信配置】配置
   * @param sms_param 短信码内容参数
   */
  async sendCode(
    phones: string,
    sms_type: SMS_TYPE = SMS_TYPE.验证码,
  ): Promise<number> {
    const cache_key = `${SEND_KEY}_${phones.substring(0, 11)}_${sms_type}`;
    const is_exist = await this.cacheService.get(cache_key);
    if (is_exist) {
      throw new Error(`该手机号发送频率太快，请稍后再试`);
    }
    // 短信模板
    const sms_dict_conf = await this.dictCacheService.getDictConf('短信配置');
    if (!sms_dict_conf?.length) {
      throw new Error(`短信未配置`);
    }
    const sms_conf: ISmsDictConf = JSON.parse(sms_dict_conf[0].field_value);

    let code = null;
    let sms_param = null;
    // 验证码生成
    if (sms_type === SMS_TYPE.验证码) {
      code = randomNo(4);
      if (sms_conf.渠道 === SMS_CHHANEL.阿里云) {
        sms_param = JSON.stringify({ code });
      }
    }

    const smsFactory = SmsFactory.create({
      channel: sms_conf.渠道,
      app_key: sms_conf.app_key,
      app_secret: sms_conf.app_secret,
    });

    const res = await smsFactory.send({
      template_code: sms_conf.模板[sms_type],
      template_param: sms_param,
      sms_content: sms_conf.模板[sms_type],
      phones,
      sign_name: sms_conf.签名,
    });
    if (!res.success) {
      throw new Error(`${res.err_msg}`);
    }
    const { id } = await this.tSmsLog.create({
      sms_type,
      mobile: phones,
      // 直接存验证码结果
      sms_param: code,
      expire_time: dayjs().add(15, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      created_by: 1,
      updated_by: 1,
    });
    // 一分钟同手机号只能发一次
    await this.cacheService.set(cache_key, Date.now(), 'EX', 59);
    return id;
  }

  /**
   * 短信验证码校验
   * @param phones 手机号
   * @param sms_type 短信类型
   * @param sms_param 校验参数和发送时一致
   */
  async checkCode(
    phones: string,
    sms_type: SMS_TYPE,
    code: string,
  ): Promise<void> {
    if (!code) {
      throw new Error(`短信参数有误`);
    }
    const sms = await this.tSmsLog.findOne({
      attributes: ['id', 'expire_time', 'sms_param'],
      where: {
        mobile: phones,
        sms_type,
        msg_status: SMS_STATUS.待验证,
      },
      order: [['id', 'desc']],
      raw: true,
    });
    if (!sms) {
      throw new Error(`验证码不存在或已使用`);
    }
    console.log(
      `过期时间：${dayjs().diff(dayjs(sms.expire_time), 'minute')}分钟`,
    );

    if (dayjs() > dayjs(sms.expire_time)) {
      throw new Error(`验证码已过期`);
    }
    if (!sms.sms_param || sms.sms_param !== code) {
      throw new Error(`验证码不正确`);
    }

    await this.tSmsLog.update(
      {
        msg_status: SMS_STATUS.已验证,
        updated_by: 1,
      },
      {
        where: {
          id: sms.id,
        },
      },
    );
  }
}
