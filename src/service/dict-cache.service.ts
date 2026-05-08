import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { CacheService } from '@service/cache.service';
import { Dictionary } from '@entities/index';

const DICT_KEY = 'DICT_ES_';

@Injectable()
export class DictCacheService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(Dictionary)
    private readonly dictRepo: Repository<Dictionary>,
  ) {}

  private getDictCacheKey(key: string): string {
    return `${DICT_KEY}${encodeURIComponent(key)}`;
  }

  /**
   * 缓存字典数据，不传 field_name 则查询全部 is_init_cache=1 的记录。
   * 按 field_name 分组写入 Redis；sort_no 升序，id 升序。
   */
  async setDictCache(field_name?: string): Promise<Dictionary[]> {
    const where: Partial<Dictionary> = { is_init_cache: 1 };
    if (field_name) {
      where.field_name = field_name;
    }

    const dict_list = await this.dictRepo.find({
      select: ['id', 'field_name', 'field_key', 'field_value'],
      where,
      order: { sort_no: 'ASC', id: 'ASC' },
    });

    const cache_key_list = field_name ? [field_name] : _.union(dict_list.map((v) => v.field_name));

    for (const _field_name of cache_key_list) {
      const cache_values = dict_list.filter((v) => v.field_name === _field_name);
      await this.cacheService.set(this.getDictCacheKey(_field_name), JSON.stringify(cache_values));
    }
    return dict_list;
  }

  /**
   * 根据 field_name(+field_key) 查字典；先走 Redis，未命中回查 DB 并回填。
   */
  async getDictConf(field_name?: string, field_key?: string): Promise<Dictionary[]> {
    let cache_dict_list: Dictionary[] = [];
    if (field_name) {
      const key = this.getDictCacheKey(field_name);
      const cached = await this.cacheService.get(key);
      if (cached) {
        cache_dict_list = JSON.parse(cached);
      }
    }
    if (!cache_dict_list?.length) {
      cache_dict_list = await this.setDictCache(field_name);
    }
    const dict_list = field_name
      ? cache_dict_list.filter((v) => v.field_name === field_name)
      : cache_dict_list;
    return field_key ? dict_list.filter((v) => v.field_key === field_key) : dict_list;
  }
}
