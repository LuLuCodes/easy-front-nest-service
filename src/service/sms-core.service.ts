import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { CacheService } from '@service/cache.service';
import { SmsLog } from '@entities/index';
import { SMS_CHHANEL, SMS_STATUS, SMS_TYPE } from '@dto/EnumDTO';
import { ISmsDictConf, SmsFactory } from '@libs/sms';
import { randomNo } from '@libs/util';
import { DictCacheService } from './dict-cache.service';

const SEND_KEY = 'SEND_KEY';

@Injectable()
export class SmsCoreService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly dictCacheService: DictCacheService,
    @InjectRepository(SmsLog)
    private readonly smsRepo: Repository<SmsLog>,
  ) {}

  async sendCode(phones: string, sms_type: SMS_TYPE = SMS_TYPE.验证码): Promise<number> {
    const cache_key = `${SEND_KEY}_${phones.substring(0, 11)}_${sms_type}`;
    if (await this.cacheService.get(cache_key)) {
      throw new Error('该手机号发送频率太快，请稍后再试');
    }

    const sms_dict_conf = await this.dictCacheService.getDictConf('短信配置');
    if (!sms_dict_conf?.length) {
      throw new Error('短信未配置');
    }
    const sms_conf: ISmsDictConf = JSON.parse(sms_dict_conf[0].field_value);

    let code: string | null = null;
    let sms_param: string | null = null;
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

    const saved = await this.smsRepo.save(
      this.smsRepo.create({
        sms_type: String(sms_type),
        mobile: phones,
        sms_param: code ?? undefined,
        expire_time: dayjs().add(15, 'minute').toDate(),
        created_by: 1,
        updated_by: 1,
      }),
    );

    await this.cacheService.set(cache_key, Date.now(), 'EX', 59);
    return saved.id;
  }

  async checkCode(phones: string, sms_type: SMS_TYPE, code: string): Promise<void> {
    if (!code) {
      throw new Error('短信参数有误');
    }

    const sms = await this.smsRepo.findOne({
      select: ['id', 'expire_time', 'sms_param'],
      where: {
        mobile: phones,
        sms_type: String(sms_type),
        msg_status: SMS_STATUS.待验证,
      },
      order: { id: 'DESC' },
    });
    if (!sms) {
      throw new Error('验证码不存在或已使用');
    }

    if (sms.expire_time && dayjs() > dayjs(sms.expire_time)) {
      throw new Error('验证码已过期');
    }
    if (!sms.sms_param || sms.sms_param !== code) {
      throw new Error('验证码不正确');
    }

    await this.smsRepo.update(
      { id: sms.id },
      {
        msg_status: SMS_STATUS.已验证,
        updated_by: 1,
      },
    );
  }
}
