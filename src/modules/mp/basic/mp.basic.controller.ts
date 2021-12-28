import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';

import { CacheService } from '@service/cache.service';
import { MpBasicService } from './mp.basic.service';
import {
  AppIdDTO,
  Code2SessionDTO,
  UserDataDecryptDTO,
  QrCodeDTO,
  LimitQrCodeDTO,
  UnQrlimitCodeDTO,
} from './mp.basic.dto';
@ApiTags('小程序基础API')
@Controller('mp/basic')
export class MpBasicController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly mpBasicService: MpBasicService,
  ) {}

  @ApiOperation({
    summary: '获取小程序accessToken',
    description: '获取小程序accessToken',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-access-token')
  async getAccessToken(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.mpBasicService.getAccessToken(body);
    return data;
  }

  @ApiOperation({
    summary: '登录凭证校验',
    description: '登录凭证校验',
  })
  @ApiBody({
    description: '请求参数',
    type: Code2SessionDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('code-2-session')
  async code2Session(@Body() body: Code2SessionDTO): Promise<any> {
    const data = await this.mpBasicService.code2Session(body);
    return data;
  }

  @ApiOperation({
    summary: '用户数据解密',
    description: '用户数据解密',
  })
  @ApiBody({
    description: '请求参数',
    type: UserDataDecryptDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('user-data-decrypt')
  async userDataDecrypt(@Body() body: UserDataDecryptDTO): Promise<any> {
    const data = await this.mpBasicService.userDataDecrypt(body);
    return data;
  }

  @ApiOperation({
    summary:
      '获取普通小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制',
    description:
      '获取普通小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制',
  })
  @ApiBody({
    description: '请求参数',
    type: QrCodeDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-qrcode')
  async createQrCode(@Body() body: QrCodeDTO): Promise<any> {
    const data = await this.mpBasicService.createQrCode(body);
    return data;
  }

  @ApiOperation({
    summary:
      '获取定制小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制',
    description:
      '获取定制小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制',
  })
  @ApiBody({
    description: '请求参数',
    type: LimitQrCodeDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-limit-qrcode')
  async createLimitQrCode(@Body() body: LimitQrCodeDTO): Promise<any> {
    const data = await this.mpBasicService.createLimitQrCode(body);
    return data;
  }

  @ApiOperation({
    summary:
      '获取定制小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制',
    description:
      '获取定制小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制',
  })
  @ApiQuery({
    description: '请求参数',
    type: UnQrlimitCodeDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('create-unlimit-qrcode')
  async createUnLimitQrCode(@Query() query: UnQrlimitCodeDTO): Promise<any> {
    const data = await this.mpBasicService.createUnLimitQrCode(query);
    return data;
  }
}
