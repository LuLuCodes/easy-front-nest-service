import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FindAndCountOptions } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { GetDictDto, SendSmsDto, VerifySmsCodeDto } from './basic.dto';
import { TDictionary } from '@models/index';
import * as _ from 'lodash';
import { SmsCoreService } from '@service/sms-core.service';

@Injectable()
export class BasicService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    private smsCoreService: SmsCoreService,
    @InjectModel(TDictionary)
    private readonly tDictionary: typeof TDictionary,
  ) {}

  async getDictionary(requestBody: GetDictDto): Promise<any> {
    const { id, field_name_list, pageNum, pageSize, order, attributes } =
      requestBody;

    const where: any = {};

    if (id) {
      where.id = id;
    }

    if (field_name_list?.length) {
      where.field_name = field_name_list;
    }
    // 组装sequelize option
    let selector: FindAndCountOptions = {
      attributes,
      where,
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
      order: order || [['id', 'desc']],
      raw: true,
    };
    selector = _.pickBy(selector, _.identity);

    const { rows, count } = await this.tDictionary.findAndCountAll(selector);
    return {
      rows,
      count,
    };
  }

  async sendCode(requestBody: SendSmsDto): Promise<any> {
    const { mobile, sms_type } = requestBody;
    await this.smsCoreService.sendCode(mobile, sms_type);
    return;
  }

  async verifyCode(requestBody: VerifySmsCodeDto): Promise<any> {
    const { mobile, sms_type, code } = requestBody;
    await this.smsCoreService.checkCode(mobile, sms_type, code);
    return;
  }
}
