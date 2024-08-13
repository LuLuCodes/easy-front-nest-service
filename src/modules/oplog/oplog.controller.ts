import { Controller, Post, Body, UsePipes, Session } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { OpLogService } from './oplog.service';

import { QueryLogDto, CreateLogDto } from './oplog.dto';

@ApiTags('用户操作日志 API')
@ApiHeader({
  name: 'x-from-source',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('log')
export class OpLogController {
  constructor(private readonly opLogService: OpLogService) {}

  @ApiOperation({
    summary: '查询用户操作日志',
    description: '查询用户操作日志',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryLogDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('query-oplog')
  async queryOpLog(
    @Body() body: QueryLogDto,
    @Session() session,
  ): Promise<any> {
    return await this.opLogService.queryLog(body, session.user);
  }

  @ApiOperation({
    summary: '测试写入日志',
    description: '测试写入日志',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateLogDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('test-write-log')
  async testWriteLog(@Body() body: CreateLogDto): Promise<any> {
    const response = await this.opLogService.createLogTask(body);
    return response;
  }
}
