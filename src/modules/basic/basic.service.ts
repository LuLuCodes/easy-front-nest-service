import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { GetEnabledSwiperDTO, GetAreaDTO } from './basic.dto';
import { TSwiper, TArea } from '@models/index';
import * as _ from 'lodash';
import { CacheKey } from '@config/global';

@Injectable()
export class BasicService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    @InjectModel(TSwiper)
    private readonly tSwiper: typeof TSwiper,
    @InjectModel(TArea)
    private readonly tArea: typeof TArea,
  ) {}

  async getSwiper(requestBody: GetEnabledSwiperDTO): Promise<any> {
    const { id, position, pageNum, pageSize, order, attributes } = requestBody;
    // where 条件拼装
    const now = Date.now();
    let where: any = {
      id,
      position,
      end_time: { [Op.gte]: now },
      enabled: 1,
    };
    where = _.pickBy(where, _.identity);

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

    const { rows, count } = await this.tSwiper.findAndCountAll(selector);
    return {
      rows,
      count,
    };
  }

  async getArea(requestBody: GetAreaDTO): Promise<any> {
    const area = await this.cacheService.get(`${CacheKey.ALL_AREA}`);
    if (area) {
      return JSON.parse(area);
    }
    const province_list: any = {};
    const city_list: any = {};
    const county_list: any = {};
    const province_rows = await this.tArea.findAll({
      attributes: ['id', 'pcd_code', 'pcd_name'],
      where: {
        level: 100,
      },
      raw: true,
    });

    const city_rows = await this.tArea.findAll({
      attributes: ['id', 'pcd_code', 'pcd_name'],
      where: {
        level: 1000,
      },
      raw: true,
    });

    const county_rows = await this.tArea.findAll({
      attributes: ['id', 'pcd_code', 'pcd_name'],
      where: {
        level: 10000,
      },
      raw: true,
    });

    for (const row of province_rows) {
      province_list[row.pcd_code] = row.pcd_name;
    }

    for (const row of city_rows) {
      city_list[row.pcd_code] = row.pcd_name;
    }

    for (const row of county_rows) {
      county_list[row.pcd_code] = row.pcd_name;
    }
    const result = { province_list, city_list, county_list };
    await this.cacheService.set(`${CacheKey.ALL_AREA}`, JSON.stringify(result));
    return result;
  }
}
