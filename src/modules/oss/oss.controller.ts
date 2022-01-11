import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { Express } from 'express';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiConsumes, ApiHeader } from '@nestjs/swagger';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { ApiMultiFile } from '@decorator/api.multi.file.decorator';
import { AliOssService } from 'nestjs-ali-oss';
import { ensureDir, outputFile, remove } from 'fs-extra';
import { resolve } from 'path';
import { length } from 'class-validator';

@ApiTags('后台商品API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('oss')
export class OssController {
  private domain = '';
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly ossService: AliOssService,
  ) {
    this.domain = configService.get('oss.domain');
    if (this.domain && !this.domain.endsWith('/')) {
      this.domain += '/';
    }
  }

  @ApiOperation({
    summary: '上传oss',
    description: '上传oss',
  })
  @Post('upload-oss')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    oss_path: {
      type: 'string',
    },
    sign: {
      type: 'string',
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
    const folderPath = resolve(__dirname, '../../../oss-files/');

    await ensureDir(folderPath);
    const filePathList = [];
    for (const file of files) {
      const filePath = `${Date.now()}-${file.originalname}`;
      await outputFile(`${folderPath}/${filePath}`, file.buffer);
      filePathList.push(filePath);
    }
    let oss_path = body.oss_path || '';
    if (oss_path === '/') {
      oss_path = oss_path.substring(1, oss_path.length - 1);
    }
    if (oss_path[oss_path.length - 1] !== '/') {
      oss_path += '/';
    }

    const uploadPromises = filePathList.map((path) => {
      return this.ossService.put(`${oss_path}${path}`, `${folderPath}/${path}`);
    });
    const delPromises = filePathList.map((path) => {
      return remove(`${folderPath}/${path}`);
    });
    const data = await Promise.all(uploadPromises);
    const urls = data.map((item: any) => {
      if (this.domain) {
        return item.url.replace(/(http|https):\/\/(.*?)\//g, this.domain);
      }
      return item.url;
    });
    await Promise.all(delPromises);
    return { urls };
  }
}
