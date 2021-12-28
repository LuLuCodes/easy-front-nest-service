import { Injectable } from '@nestjs/common';
import {
  WXCoreFactory,
  WXCore,
  BasicAPI,
  WeChat,
} from '@easy-front-core-sdk/wx';
import { AppIdDTO, NetCheckDTO } from './wx.basic.dto';
import { ResponseCode } from '@config/global';
@Injectable()
export class WxBasicService {
  async getAccessToken(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    const token = await core.getAccessToken();
    return { token };
  }

  async getApiDomainIp(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await BasicAPI.getApiDomainIp(core);
  }

  async getCallbackIp(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await BasicAPI.getCallbackIp(core);
  }

  async netCheck(requestBody: NetCheckDTO): Promise<any> {
    const { appId, action, operator } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await BasicAPI.netCheck(core, action, operator);
  }

  async checkSignature(requestQuery): Promise<any> {
    const { appId, signature, echostr, timestamp, nonce } = requestQuery;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await WeChat.checkSignature(
      core,
      signature,
      timestamp,
      nonce,
      echostr,
    );
  }

  async clearQuota(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await BasicAPI.clearQuota(core, appId);
  }

  async getAutoReplyRules(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await BasicAPI.getAutoReplyRules(core);
  }
}
