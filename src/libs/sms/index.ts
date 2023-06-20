import { SMS_CHHANEL } from '@dto/EnumDTO';
import { AliyunSms } from './aliyunSms';

export interface ISms {
  // 发送普通短信
  send(param: ISmsSendconfig): Promise<ISmsSendRes>;
  // 发送营销短信
  // sendMarketing(): Promise<ISmsSendRes>;
}

export interface ISmsconfig {
  // 短信渠道类型
  channel: SMS_CHHANEL;
  app_key: string;
  app_secret: string;
}

export interface ISmsSendconfig {
  // 短信渠道类型
  phones: string | string[];
  sms_content: string;
  template_code?: string;
  sign_name: string;
  template_param?: any;
}

export interface ISmsSendRes {
  success: boolean;
  err_msg: string;
}

export interface ISmsDictConf {
  app_key: string;
  app_secret: string;
  模板?: Record<string, any>;
  渠道: SMS_CHHANEL;
  签名: string;
}

export class SmsFactory {
  static create(config: ISmsconfig): AliyunSms {
    switch (config.channel) {
      case SMS_CHHANEL.阿里云:
        return new AliyunSms(config);
      default:
        return null;
    }
  }
}
