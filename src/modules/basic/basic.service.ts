import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import * as _ from 'lodash';

import { CacheService } from '@service/cache.service';
import { SmsCoreService } from '@service/sms-core.service';
import { Dictionary } from '@entities/index';
import { GetDictDto, SendSmsDto, VerifySmsCodeDto } from './basic.dto';

@Injectable()
export class BasicService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly smsCoreService: SmsCoreService,
    @InjectRepository(Dictionary)
    private readonly dictRepo: Repository<Dictionary>,
  ) {}

  async getDictionary(requestBody: GetDictDto): Promise<{
    rows: Dictionary[];
    count: number;
  }> {
    const { id, field_name_list, page_num, page_size, attributes } = requestBody;

    const where: FindOptionsWhere<Dictionary> = {};
    if (id) where.id = id;
    if (field_name_list?.length) where.field_name = In(field_name_list);

    const [rows, count] = await this.dictRepo.findAndCount({
      select: attributes as (keyof Dictionary)[] | undefined,
      where: _.isEmpty(where) ? undefined : where,
      skip: (page_num - 1) * page_size,
      take: page_size,
      order: { id: 'DESC' },
    });

    return { rows, count };
  }

  async sendCode(requestBody: SendSmsDto): Promise<void> {
    const { mobile, sms_type } = requestBody;
    await this.smsCoreService.sendCode(mobile, sms_type);
  }

  async verifyCode(requestBody: VerifySmsCodeDto): Promise<void> {
    const { mobile, sms_type, code } = requestBody;
    await this.smsCoreService.checkCode(mobile, sms_type, code);
  }
}

void CacheService;
