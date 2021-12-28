import { Injectable } from '@nestjs/common';
import {
  WXPayCoreFactory,
  WXPayCore,
  WXPAY_DOMAIN,
  WXPAY_API_URL,
} from '@easy-front-core-sdk/wxpay';
import { MchIdDTO } from './wx.pay.basic.dto';

@Injectable()
export class WxPayBasicService {
  async getPlatCert(requestBody: MchIdDTO): Promise<any> {
    const { mchId } = requestBody;
    const core: WXPayCore = WXPayCoreFactory.getCore(mchId);
    const response = await core.get(
      WXPAY_DOMAIN.CHINA,
      WXPAY_API_URL.GET_CERTIFICATES,
    );

    if (response.status !== 200) {
      throw new Error(`error code ${response.status}`);
    }
    return response.data;
  }
}
