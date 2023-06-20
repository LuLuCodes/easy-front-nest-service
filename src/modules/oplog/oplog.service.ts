import { Global, Injectable } from '@nestjs/common';
import { CacheService } from '@service/cache.service';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { TUserOplog } from '@models/index';
import * as _ from 'lodash';
import { CreateLogDto, QueryLogDto } from './oplog.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as dayjs from 'dayjs';
import {} from '@dto/EnumDTO';
import { Op } from 'sequelize';

@Global()
@Injectable()
export class OpLogService {
  constructor(
    private sequelize: Sequelize,
    private readonly cacheService: CacheService,
    @InjectQueue('op-log')
    private logQueue: Queue,
    @InjectModel(TUserOplog)
    private readonly tUserOplog: typeof TUserOplog,
  ) {}

  /**
   * 创建操作日志异步接口
   * @param logDto CreateLogDto
   */
  async createLogTask(logDto: CreateLogDto): Promise<void> {
    await this.logQueue.add('oplog', logDto, {
      attempts: 3,
      delay: 20,
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  /******************************* 以下为具体业务方法 ***********************/
  /******************************* 以下为具体业务方法 ***********************/
  /******************************* 以下为具体业务方法 ***********************/

  async queryLog(requestBody: QueryLogDto, user: any): Promise<any> {
    const { target_type, action_desc, action_user } = requestBody;
    const pageNum = requestBody.pageNum || 1;
    const pageSize = requestBody.pageSize || 10;
    const offset = (pageNum - 1) * pageSize;
    let where: any = { target_type };
    if (action_desc) {
      where.action_desc = { [Op.substring]: action_desc };
    }
    if (action_user) {
      where.action_user = { [Op.substring]: action_user };
    }
    where = _.omitBy(where, _.isNil);
    return await this.tUserOplog.findAndCountAll({
      attributes: { exclude: ['target_type', 'deleted_at'] },
      where,
      offset: offset,
      limit: pageSize,
      order: requestBody.order || [['id', 'desc']],
    });
  }

  // 写入操作日志
  async writeOpLog(log: any): Promise<void> {
    try {
      await this.tUserOplog.create({
        ...log,
        created_by: 1,
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } catch (error) {
      console.error(
        `写入日志失败：入参=${JSON.stringify(log)},异常=${error.message}`,
      );
    }
  }

  log(content, args: any = '') {
    const msg = `[${dayjs().format('MM-DD HH:mm:ss')}]######【${content}】\t${
      typeof args === 'object' ? '\n' + JSON.stringify(args) : args
    }`;
    console.log(msg);
  }
}
