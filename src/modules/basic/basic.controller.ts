import { Controller, Post, Body, UsePipes, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheService } from '@service/cache.service';
import { BasicService } from './basic.service';

import { GetDictDto, SendSmsDto, VerifySmsCodeDto } from './basic.dto';

@ApiTags('基础API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('basic')
export class BasicController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly basicService: BasicService,
  ) {}

  @ApiOperation({
    summary: '获取字典',
    description: '获取字典',
  })
  @ApiBody({
    description: '请求参数',
    type: GetDictDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-dict')
  async getDictionary(@Body() body: GetDictDto): Promise<any> {
    const response = await this.basicService.getDictionary(body);
    return response;
  }

  @ApiOperation({
    summary: '发送短信',
    description: '发送短信场景',
  })
  @ApiBody({
    description: '请求参数',
    type: SendSmsDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('send-code')
  async sendCode(@Body() body: SendSmsDto): Promise<any> {
    const response = await this.basicService.sendCode(body);
    return response;
  }

  @ApiOperation({
    summary: '校验短信码',
    description: '校验短信码',
  })
  @ApiBody({
    description: '请求参数',
    type: VerifySmsCodeDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('verify-code')
  async verifyCode(@Body() body: VerifySmsCodeDto): Promise<any> {
    const response = await this.basicService.verifyCode(body);
    return response;
  }
}
