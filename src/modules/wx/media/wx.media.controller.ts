import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { ApiMultiFile } from '@decorator/api.multi.file.decorator';
import { WxMediaService } from './wx.media.service';
import {
  AppIdDTO,
  MediaType,
  MediaIdDTO,
  AddNewsDTO,
  UpdateNewsDTO,
  BatchGetMaterialDTO,
} from './wx.media.dto';

import { ensureDir, outputFile, remove } from 'fs-extra';
import { resolve } from 'path';

@ApiTags('微信公众号素材API')
@Controller('wx/media')
export class WxMediaController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly wxMediaService: WxMediaService,
  ) {}

  @ApiOperation({
    summary: '新增临时素材',
    description: '新增临时素材',
  })
  @Post('upload-temporary-material')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    appId: {
      type: 'string',
      nullable: false,
    },
    mediaType: {
      default: MediaType.IMAGE,
      enum: MediaType,
      nullable: false,
    },
  })
  // @UseInterceptors(FilesInterceptor('files'))
  @CatchError()
  async uploadTemporaryMaterial(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): Promise<any> {
    if (files.length === 0) {
      throw new BadRequestException('缺少文件');
    }
    const { appId, mediaType } = body;
    if (!appId) {
      throw new BadRequestException('缺少appId');
    }
    if (!mediaType) {
      throw new BadRequestException('缺少mediaType');
    }
    const folderPath = resolve(__dirname, '../../../../template-files/');
    await ensureDir(folderPath);
    const filePathList = [];
    for (const file of files) {
      const filePath = `${folderPath}/${Date.now()}-${file.originalname}`;
      await outputFile(filePath, file.buffer);
      filePathList.push(filePath);
    }
    const data = await this.wxMediaService.uploadTemporaryMaterial(
      body,
      filePathList,
    );
    const delPromises = filePathList.map((path) => {
      return remove(path);
    });
    await Promise.all(delPromises);
    return data;
  }

  @ApiOperation({
    summary: '获取临时素材',
    description: '获取临时素材',
  })
  @ApiBody({
    description: '请求参数',
    type: MediaIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-temporary-material')
  @CatchError()
  async getTemporaryMaterial(@Body() body: MediaIdDTO): Promise<any> {
    const data = await this.wxMediaService.getTemporaryMaterial(body);
    return data;
  }

  @ApiOperation({
    summary: '高清语音素材获取接口',
    description: '高清语音素材获取接口',
  })
  @ApiBody({
    description: '请求参数',
    type: MediaIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-jssdk-material')
  @CatchError()
  async getJssdkMedia(@Body() body: MediaIdDTO): Promise<any> {
    const data = await this.wxMediaService.getJssdkMedia(body);
    return data;
  }

  @ApiOperation({
    summary: '新增永久图文素材',
    description: '新增永久图文素材',
  })
  @ApiBody({
    description: '请求参数',
    type: AddNewsDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('add-news')
  @CatchError()
  async addNews(@Body() body: AddNewsDTO): Promise<any> {
    const data = await this.wxMediaService.addNews(body);
    return data;
  }

  @ApiOperation({
    summary: '更新永久图文素材',
    description: '更新永久图文素材',
  })
  @ApiBody({
    description: '请求参数',
    type: UpdateNewsDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('update-news')
  @CatchError()
  async updateNews(@Body() body: UpdateNewsDTO): Promise<any> {
    const data = await this.wxMediaService.updateNews(body);
    return data;
  }

  @ApiOperation({
    summary: '上传图文消息内的图片获取URL',
    description: '上传图文消息内的图片获取URL',
  })
  @Post('upload-img')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    appId: {
      type: 'string',
      nullable: false,
    },
  })
  // @UseInterceptors(FilesInterceptor('files'))
  @CatchError()
  async uploadImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): Promise<any> {
    if (files.length === 0) {
      throw new BadRequestException('缺少文件');
    }
    const { appId } = body;
    if (!appId) {
      throw new BadRequestException('缺少appId');
    }
    const folderPath = resolve(__dirname, '../../../../template-files/');
    await ensureDir(folderPath);
    const filePathList = [];
    for (const file of files) {
      const filePath = `${folderPath}/${Date.now()}-${file.originalname}`;
      await outputFile(filePath, file.buffer);
      filePathList.push(filePath);
    }
    const data = await this.wxMediaService.uploadImg(body, filePathList);
    const delPromises = filePathList.map((path) => {
      return remove(path);
    });
    await Promise.all(delPromises);
    return data;
  }

  @ApiOperation({
    summary: '新增其他类型永久素材',
    description: '新增其他类型永久素材',
  })
  @Post('add-other-material')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    appId: {
      type: 'string',
      nullable: false,
    },
    mediaType: {
      default: MediaType.IMAGE,
      enum: MediaType,
      nullable: false,
    },
  })
  // @UseInterceptors(FilesInterceptor('files'))
  @CatchError()
  async addOtherMaterial(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): Promise<any> {
    if (files.length === 0) {
      throw new BadRequestException('缺少文件');
    }
    const { appId, mediaType } = body;
    if (!appId) {
      throw new BadRequestException('缺少appId');
    }
    if (!mediaType) {
      throw new BadRequestException('缺少mediaType');
    }
    const folderPath = resolve(__dirname, '../../../../template-files/');
    await ensureDir(folderPath);
    const filePathList = [];
    for (const file of files) {
      const filePath = `${folderPath}/${Date.now()}-${file.originalname}`;
      await outputFile(filePath, file.buffer);
      filePathList.push(filePath);
    }
    const data = await this.wxMediaService.addOtherMaterial(body, filePathList);
    const delPromises = filePathList.map((path) => {
      return remove(path);
    });
    await Promise.all(delPromises);
    return data;
  }

  @ApiOperation({
    summary: '新增video类型永久素材',
    description: '新增video类型永久素材',
  })
  @Post('add-video-material')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    appId: {
      type: 'string',
      nullable: false,
    },
    title: {
      type: 'string',
      nullable: false,
    },
    introduction: {
      type: 'string',
      nullable: false,
    },
  })
  // @UseInterceptors(FileInterceptor('files'))
  @CatchError()
  async addVideoMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('缺少文件');
    }
    const { appId, title, introduction } = body;
    if (!appId) {
      throw new BadRequestException('缺少appId');
    }
    if (!title) {
      throw new BadRequestException('缺少title');
    }
    if (!introduction) {
      throw new BadRequestException('缺少introduction');
    }
    const folderPath = resolve(__dirname, '../../../../template-files/');
    await ensureDir(folderPath);
    const filePath = `${folderPath}/${Date.now()}-${file.originalname}`;
    await outputFile(filePath, file.buffer);
    const data = await this.wxMediaService.addVideoMaterial(body, filePath);
    await remove(filePath);
    return data;
  }

  @ApiOperation({
    summary: '获取永久素材',
    description: '获取永久素材',
  })
  @ApiBody({
    description: '请求参数',
    type: MediaIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-material')
  @CatchError()
  async getMaterial(@Body() body: MediaIdDTO): Promise<any> {
    const data = await this.wxMediaService.getMaterial(body);
    return data;
  }

  @ApiOperation({
    summary: '删除永久素材',
    description: '删除永久素材',
  })
  @ApiBody({
    description: '请求参数',
    type: MediaIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('delete-material')
  @CatchError()
  async delMaterial(@Body() body: MediaIdDTO): Promise<any> {
    const data = await this.wxMediaService.delMaterial(body);
    return data;
  }

  @ApiOperation({
    summary: '获取素材总数',
    description: '获取素材总数',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-material-count')
  @CatchError()
  async getMaterialCount(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxMediaService.getMaterialCount(body);
    return data;
  }

  @ApiOperation({
    summary: '获取素材列表',
    description: '获取素材列表',
  })
  @ApiBody({
    description: '请求参数',
    type: BatchGetMaterialDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('batch-get-material')
  @CatchError()
  async batchGetMaterial(@Body() body: BatchGetMaterialDTO): Promise<any> {
    const data = await this.wxMediaService.batchGetMaterial(body);
    return data;
  }
}
