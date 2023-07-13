import { Injectable } from '@nestjs/common';
import {
  MPCoreFactory,
  MPCore,
  BasicAPI,
  QrCodeAPI,
} from '@easy-front-core-sdk/miniprogram';
import { CacheService } from '@service/cache.service';
import {
  AppIdDTO,
  Code2SessionDTO,
  UserDataDecryptDTO,
  QrCodeDTO,
  LimitQrCodeDTO,
  UnQrlimitCodeDTO,
} from './mp.basic.dto';
import { ResponseCode } from '@config/global';
import { sha1, aes128cbcDecrypt } from '@libs/cryptogram';

@Injectable()
export class MpBasicService {
  constructor(private cacheService: CacheService) {}
  async getAccessToken(requestBody: AppIdDTO): Promise<any> {
    try {
      const { appId } = requestBody;
      const core: MPCore = MPCoreFactory.getCore(appId);
      const token = await core.getAccessToken();
      return { code: ResponseCode.OK, data: { token }, msg: '' };
    } catch (error) {
      return {
        code: ResponseCode.UNKOWN_ERROR,
        data: null,
        msg: error.message,
      };
    }
  }

  async code2Session(requestBody: Code2SessionDTO): Promise<any> {
    const { appId, code } = requestBody;
    const core: MPCore = MPCoreFactory.getCore(appId);
    const data = await BasicAPI.code2Session(core, code);
    const { openid, session_key } = data;
    await this.cacheService.set(`session_key#${openid}`, session_key);
    return { openid };
  }

  async userDataDecrypt(requestBody: UserDataDecryptDTO): Promise<any> {
    const { openId, rawData, signature, encryptedData, iv } = requestBody;
    const session_key = await this.cacheService.get(`session_key#${openId}`);

    const key = Buffer.from(session_key, 'base64');
    const baseIv = Buffer.from(iv, 'base64');

    if (rawData && signature) {
      const signature2 = sha1(rawData + session_key);
      if (signature2 !== signature) {
        throw new Error(`签名错误`);
      }
    }

    const ecrypt = aes128cbcDecrypt(key, baseIv, encryptedData);

    return ecrypt ? JSON.parse(ecrypt) : ecrypt;
  }

  async createQrCode(requestBody: QrCodeDTO): Promise<any> {
    const { appId, path, width } = requestBody;
    const core: MPCore = MPCoreFactory.getCore(appId);
    const data = await QrCodeAPI.createQRCode(core, path, width);
    return data;
  }

  async createLimitQrCode(requestBody: LimitQrCodeDTO): Promise<any> {
    const { appId, path, width, autoColor, lineColor, isHyaline } = requestBody;
    const core: MPCore = MPCoreFactory.getCore(appId);
    const data = await QrCodeAPI.getWxAcode(
      core,
      path,
      width,
      autoColor,
      lineColor,
      isHyaline,
    );
    return data;
  }

  async createUnLimitQrCode(requestBody: UnQrlimitCodeDTO): Promise<any> {
    const { appId, scene, path, width, autoColor, lineColor, isHyaline } =
      requestBody;
    const core: MPCore = MPCoreFactory.getCore(appId);
    const data = await QrCodeAPI.getUnlimited(
      core,
      scene,
      path,
      false,
      'develop',
      width,
      autoColor,
      lineColor,
      isHyaline,
    );
    return data;
  }
}
