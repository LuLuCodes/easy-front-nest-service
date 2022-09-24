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
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { WxPayBasicService } from './wx.pay.basic.service';
import { MchIdDTO } from './wx.pay.basic.dto';

@ApiTags('微信支付基础API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('wxpay/basic')
export class WxPayBasicController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly wxPayBasicService: WxPayBasicService,
  ) {}

  @ApiOperation({
    summary: '查询平台证书',
    description: '查询平台证书',
  })
  @ApiBody({
    description: '请求参数',
    type: MchIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-plat-cert')
  async getPlatCert(@Body() body: MchIdDTO): Promise<any> {
    const data = await this.wxPayBasicService.getPlatCert(body);
    return data;
  }
}
