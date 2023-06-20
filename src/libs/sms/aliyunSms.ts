import * as Core from '@alicloud/pop-core';

import { ISms, ISmsSendRes, ISmsconfig, ISmsSendconfig } from './index';

export class AliyunSms implements ISms {
  private smsClient;
  constructor(config: ISmsconfig) {
    this.createClient(config);
  }
  createClient(config: ISmsconfig): any {
    this.smsClient = new Core({
      accessKeyId: config.app_key,
      accessKeySecret: config.app_secret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
  }

  async send(param: ISmsSendconfig): Promise<ISmsSendRes> {
    const template: any = {
      // RegionId:,
      PhoneNumbers: param.phones,
      SignName: param.sign_name,
      TemplateCode: param.template_code,
    };
    if (param.template_param) {
      template.TemplateParam = param.template_param;
    }

    const send_res: ISmsSendRes = { success: false, err_msg: '' };
    try {
      const res = await this.smsClient.request('SendSms', template, {
        method: 'POST',
      });
      if (res.Code !== 'OK') {
        // throw new Error(`aliyun短信发送失败：${res.Message}`)
        send_res.err_msg = res.Message;
      } else {
        send_res.err_msg = 'ok';
        send_res.success = true;
      }
    } catch (error) {
      send_res.err_msg = `aliyun短信发送失败：${error.Message}`;
    }
    return send_res;
    // {  "RequestId": "614048FB-0619-4439-A1D5-AA8B218A****",  "Message": "OK",  "BizId": "386715418801811068^0",  "Code": "OK"}
  }
}
