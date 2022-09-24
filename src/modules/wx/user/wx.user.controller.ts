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
import { WxUserService } from './wx.user.service';
import {
  AppIdDTO,
  GetAuthorizeUrlDTO,
  GetSnsAccessTokenDTO,
  RefreshTokenDTO,
  CheckAccessTokenDTO,
  GetUserInfoDTO,
} from './wx.user.dto';

@ApiTags('微信公众号用户API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('wx/user')
export class WxUserController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly wxUserService: WxUserService,
  ) {}

  @ApiOperation({
    summary: '获取授权链接',
    description: '获取授权链接',
  })
  @ApiBody({
    description: '请求参数',
    type: GetAuthorizeUrlDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-authorize-url')
  async getAuthorizeUrl(@Body() body: GetAuthorizeUrlDTO): Promise<any> {
    const data = await this.wxUserService.getAuthorizeUrl(body);
    return data;
  }

  @ApiOperation({
    summary: '通过code换取网页授权access_token',
    description: '通过code换取网页授权access_token',
  })
  @ApiBody({
    description: '请求参数',
    type: GetSnsAccessTokenDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-sns-access-token')
  async getSnsAccessToken(@Body() body: GetSnsAccessTokenDTO): Promise<any> {
    const data = await this.wxUserService.getSnsAccessToken(body);
    return data;
  }

  @ApiOperation({
    summary: '检验授权凭证（access_token）是否有效',
    description: '检验授权凭证（access_token）是否有效',
  })
  @ApiBody({
    description: '请求参数',
    type: CheckAccessTokenDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('check-access-token')
  async checkAccessToken(@Body() body: CheckAccessTokenDTO): Promise<any> {
    const data = await this.wxUserService.checkAccessToken(body);
    return data;
  }

  @ApiOperation({
    summary: '刷新access_token',
    description: '刷新access_token',
  })
  @ApiBody({
    description: '请求参数',
    type: RefreshTokenDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('refresh-access-token')
  async refreshAccessToken(@Body() body: RefreshTokenDTO): Promise<any> {
    const data = await this.wxUserService.refreshAccessToken(body);
    return data;
  }

  @ApiOperation({
    summary: '拉取用户信息(需scope为 snsapi_userinfo)',
    description: '拉取用户信息(需scope为 snsapi_userinfo)',
  })
  @ApiBody({
    description: '请求参数',
    type: GetUserInfoDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-user-info')
  async getUserInfo(@Body() body: GetUserInfoDTO): Promise<any> {
    const data = await this.wxUserService.getUserInfo(body);
    return data;
  }
}
