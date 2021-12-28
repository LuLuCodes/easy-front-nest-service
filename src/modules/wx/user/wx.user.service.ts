import { Injectable } from '@nestjs/common';
import {
  WXCoreFactory,
  WXCore,
  SnsAccessTokenAPI,
  WeChat,
} from '@easy-front-core-sdk/wx';
import {
  AppIdDTO,
  GetAuthorizeUrlDTO,
  GetSnsAccessTokenDTO,
  RefreshTokenDTO,
  CheckAccessTokenDTO,
  GetUserInfoDTO,
} from './wx.user.dto';
import { ResponseCode } from '@config/global';

@Injectable()
export class WxUserService {
  async getAuthorizeUrl(requestBody: GetAuthorizeUrlDTO): Promise<any> {
    const { appId, redirectUri, scope, state } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await SnsAccessTokenAPI.getAuthorizeUrl(
      core,
      redirectUri,
      scope,
      state,
    );
  }

  async getSnsAccessToken(requestBody: GetSnsAccessTokenDTO): Promise<any> {
    const { appId, code } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await SnsAccessTokenAPI.getSnsAccessToken(core, code);
  }

  async refreshAccessToken(requestBody: RefreshTokenDTO): Promise<any> {
    const { appId, refreshToken } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await SnsAccessTokenAPI.refreshAccessToken(core, refreshToken);
  }

  async checkAccessToken(requestBody: CheckAccessTokenDTO): Promise<any> {
    const { accessToken, openId } = requestBody;
    return await SnsAccessTokenAPI.checkAccessToken(accessToken, openId);
  }

  async getUserInfo(requestBody: GetUserInfoDTO): Promise<any> {
    const { accessToken, openId, lang } = requestBody;
    return await SnsAccessTokenAPI.getUserInfo(accessToken, openId, lang);
  }
}
