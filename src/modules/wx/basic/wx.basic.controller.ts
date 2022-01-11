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
import { WxBasicService } from './wx.basic.service';
import { AppIdDTO, NetCheckDTO } from './wx.basic.dto';
@ApiTags('微信公众号基础API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('wx/basic')
export class WxBasicController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly wxBasicService: WxBasicService,
  ) {}

  @ApiOperation({
    summary: '获取微信公众号accessToken',
    description: '获取微信公众号accessToken',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-access-token')
  @CatchError()
  async getAccessToken(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxBasicService.getAccessToken(body);
    return data;
  }

  @ApiOperation({
    summary: '获取微信API接口IP地址',
    description: '获取微信API接口IP地址',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-api-domain-ip')
  @CatchError()
  async getApiDomainIp(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxBasicService.getApiDomainIp(body);
    return data;
  }

  @ApiOperation({
    summary: '获取微信callback IP地址',
    description: '获取微信callback IP地址',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-callback-ip')
  @CatchError()
  async getCallbackIp(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxBasicService.getCallbackIp(body);
    return data;
  }

  @ApiOperation({
    summary: '网络检测',
    description: '网络检测',
  })
  @ApiBody({
    description: '请求参数',
    type: NetCheckDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('net-check')
  @CatchError()
  async netCheck(@Body() body: NetCheckDTO): Promise<any> {
    const data = await this.wxBasicService.netCheck(body);
    return data;
  }

  @ApiOperation({
    summary: '消息通知',
    description: '消息通知',
  })
  @Get('notify-message/:appId')
  @CatchError()
  async notifyMessage(@Query() query: any, @Param() param: any): Promise<any> {
    return await this.wxBasicService.checkSignature({
      appId: param.appId,
      ...query,
    });
  }

  @ApiOperation({
    summary: '对公众号的所有API调用次数进行清零',
    description: '对公众号的所有API调用次数进行清零',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('clear-quota')
  @CatchError()
  async clearQuota(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxBasicService.clearQuota(body);
    return data;
  }

  @ApiOperation({
    summary: '获取公众号的自动回复规则',
    description: '获取公众号的自动回复规则',
  })
  @ApiBody({
    description: '请求参数',
    type: AppIdDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-auto-reply-rules')
  @CatchError()
  async getAutoReplyRules(@Body() body: AppIdDTO): Promise<any> {
    const data = await this.wxBasicService.getAutoReplyRules(body);
    return data;
  }
}
