import { Injectable } from '@nestjs/common';
import { CacheService } from '@service/cache.service';

import { InjectModel } from '@nestjs/sequelize';
import { TDictionary } from '@models/index';
import * as _ from 'lodash';

const DICT_KEY = 'DICT_ES_';

@Injectable()
export class DictCacheService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectModel(TDictionary)
    private readonly tDictionary: typeof TDictionary,
  ) {}

  private getDictCacheKey(key: string): string {
    return `${DICT_KEY}${encodeURIComponent(key)}`;
  }

  /**
   * 缓存字典数据，不传field_name则查询全部
   * @param field_name 字典名
   * @returns 返回缓存的字典列表
   */
  async setDictCache(field_name?: string): Promise<TDictionary[]> {
    // 字典表is_init_cache标记，说明这个配置要在项目初始化的时候缓存起来
    // sort_no从小到大排序 越小越靠前
    const where: Partial<TDictionary> = { is_init_cache: 1 };
    if (field_name) {
      where.field_name = field_name;
    }
    const dict_list = await this.tDictionary.findAll({
      attributes: ['id', 'field_name', 'field_key', 'field_value'],
      where,
      order: [
        ['sort_no', 'asc'],
        ['id', 'asc'],
      ],
      raw: true,
    });

    const cache_key_list = field_name
      ? [field_name]
      : _.union(dict_list.map((v) => v.field_name));
    // 根据字典名分组缓存
    for (const _field_name of cache_key_list) {
      const cache_values = dict_list.filter(
        (v) => v.field_name === _field_name,
      );
      await this.cacheService.set(
        this.getDictCacheKey(_field_name),
        JSON.stringify(cache_values),
      );
    }
    return dict_list;
  }

  /**
   * 根据字典名去查询配置
   * @param field_name 字典名
   * @param field_key 字典key
   * @returns 返回TDictionary字典对象
   */
  async getDictConf(
    field_name?: string,
    field_key?: string,
  ): Promise<TDictionary[]> {
    // 如果存在项目id，先判断有缓存的直接返回
    let cache_dict_list: TDictionary[] = [];
    if (field_name) {
      const key = this.getDictCacheKey(field_name);
      const sass_dict = await this.cacheService.get(key);
      if (sass_dict) {
        cache_dict_list = JSON.parse(sass_dict);
      }
    }
    if (!cache_dict_list?.length) {
      cache_dict_list = await this.setDictCache(field_name);
    }
    const dict_list = field_name
      ? cache_dict_list.filter((v) => v.field_name === field_name)
      : cache_dict_list;
    return field_key
      ? dict_list.filter((v) => v.field_key === field_key)
      : dict_list;
  }
}
