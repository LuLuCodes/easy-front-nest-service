import { Global, Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';

import { UserOplog } from '@entities/index';
import { CreateLogDto, QueryLogDto } from './oplog.dto';

@Global()
@Injectable()
export class OpLogService {
  private readonly logger = new Logger(OpLogService.name);

  constructor(
    @InjectQueue('op-log')
    private readonly logQueue: Queue,
    @InjectRepository(UserOplog)
    private readonly oplogRepo: Repository<UserOplog>,
  ) {}

  /** 创建操作日志异步接口（推到队列，由 OpLogProcessor 写库） */
  async createLogTask(logDto: CreateLogDto): Promise<void> {
    await this.logQueue.add('oplog', logDto, {
      attempts: 3,
      delay: 20,
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  async queryLog(
    requestBody: QueryLogDto,
    _user?: unknown,
  ): Promise<{ rows: UserOplog[]; count: number }> {
    const {
      target_type,
      action_desc,
      action_user,
      page_num = 1,
      page_size = 10,
    } = requestBody as QueryLogDto & { page_num?: number; page_size?: number };

    const where: FindOptionsWhere<UserOplog> = { target_type };
    if (action_desc) where.action_desc = Like(`%${action_desc}%`);
    if (action_user) where.action_user = Like(`%${action_user}%`);

    const cleaned = _.omitBy(where, _.isNil) as FindOptionsWhere<UserOplog>;

    const [rows, count] = await this.oplogRepo.findAndCount({
      select: {
        id: true,
        user_id: true,
        target_id: true,
        action_user: true,
        action_type: true,
        action_desc: true,
        created_at: true,
        updated_at: true,
        created_by: true,
        updated_by: true,
      },
      where: cleaned,
      skip: (page_num - 1) * page_size,
      take: page_size,
      order: { id: 'DESC' },
    });

    return { rows, count };
  }

  async writeOpLog(log: Partial<UserOplog>): Promise<void> {
    try {
      await this.oplogRepo.save(
        this.oplogRepo.create({
          ...log,
          created_by: 1,
          updated_by: 1,
          created_at: new Date(),
        }),
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`写入日志失败：入参=${JSON.stringify(log)},异常=${msg}`);
    }
  }

  log(content: string, args: unknown = ''): void {
    const msg = `[${dayjs().format('MM-DD HH:mm:ss')}]######【${content}】\t${
      typeof args === 'object' ? '\n' + JSON.stringify(args) : String(args)
    }`;
    this.logger.log(msg);
  }
}
