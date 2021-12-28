import { Injectable } from '@nestjs/common';
import { WXCoreFactory, WXCore, MediaAPI } from '@easy-front-core-sdk/wx';
import {
  AppIdDTO,
  AddNewsDTO,
  UpdateNewsDTO,
  MediaIdDTO,
  BatchGetMaterialDTO,
} from './wx.media.dto';
import { ResponseCode } from '@config/global';

@Injectable()
export class WxMediaService {
  async uploadTemporaryMaterial(
    requestBody: any,
    filePathList: string[],
  ): Promise<any> {
    const { appId, mediaType } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    const promises = filePathList.map(function (filePath) {
      return MediaAPI.uploadMedia(core, filePath, mediaType);
    });
    return await Promise.all(promises);
  }

  async getTemporaryMaterial(requestBody: MediaIdDTO): Promise<any> {
    const { appId, mediaId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.getMedia(core, mediaId);
  }

  async getJssdkMedia(requestBody: MediaIdDTO): Promise<any> {
    const { appId, mediaId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.getJssdkMedia(core, mediaId);
  }

  async addNews(requestBody: AddNewsDTO): Promise<any> {
    const { appId, mediaArticles } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.addNews(core, mediaArticles);
  }

  async updateNews(requestBody: UpdateNewsDTO): Promise<any> {
    const { appId, mediaId, index, mediaArticles } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.updateNews(core, mediaId, index, mediaArticles);
  }

  async uploadImg(requestBody: any, filePathList: string[]): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    const promises = filePathList.map(function (filePath) {
      return MediaAPI.uploadImg(core, filePath);
    });

    return await Promise.all(promises);
  }

  async addOtherMaterial(
    requestBody: any,
    filePathList: string[],
  ): Promise<any> {
    const { appId, mediaType } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    const promises = filePathList.map(function (filePath) {
      return MediaAPI.addMaterial(core, filePath, mediaType);
    });

    return await Promise.all(promises);
  }

  async addVideoMaterial(requestBody: any, filePath: string): Promise<any> {
    const { appId, title, introduction } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.addVideoMaterial(core, filePath, title, introduction);
  }

  async getMaterial(requestBody: MediaIdDTO): Promise<any> {
    const { appId, mediaId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.getMaterial(core, mediaId);
  }

  async delMaterial(requestBody: MediaIdDTO): Promise<any> {
    const { appId, mediaId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.delMaterial(core, mediaId);
  }

  async getMaterialCount(requestBody: AppIdDTO): Promise<any> {
    const { appId } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.getMaterialCount(core);
  }

  async batchGetMaterial(requestBody: BatchGetMaterialDTO): Promise<any> {
    const { appId, mediaType, offset, count } = requestBody;
    const core: WXCore = WXCoreFactory.getCore(appId);
    return await MediaAPI.batchGetMaterial(core, mediaType, offset, count);
  }
}
