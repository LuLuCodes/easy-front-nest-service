import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { CacheKey } from '@config/global';
import { GetGoodsSpuDTO, GetGoodsGroupByCodeDTO } from './goods.dto';
import {
  TProductSpu,
  TProductSku,
  TProductGroupRelation,
  TProductGroup,
} from '@models/index';
import * as _ from 'lodash';

@Injectable()
export class GoodsService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    @InjectModel(TProductSpu)
    private readonly tProductSpu: typeof TProductSpu,
    @InjectModel(TProductSku)
    private readonly tProductSku: typeof TProductSku,
    @InjectModel(TProductGroupRelation)
    private readonly tProductGroupRelation: typeof TProductGroupRelation,
    @InjectModel(TProductGroup)
    private readonly tProductGroup: typeof TProductGroup,
  ) {}

  async getGoodsSpu(requestBody: GetGoodsSpuDTO) {
    const {
      id,
      group_id,
      spu_name,
      is_new,
      is_hot,
      is_recommend,
      brand_id,
      category_id,
      pageNum,
      pageSize,
      order,
      attributes,
    } = requestBody;
    if (!group_id) {
      // where 条件拼装
      let where: any = {
        id,
        spu_name: spu_name
          ? {
              [Op.like]: `%${spu_name}%`,
            }
          : undefined,
        is_new,
        is_hot,
        is_recommend,
        brand_id,
        category_id,
        publish_status: 1,
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

      const { rows, count } = await this.tProductSpu.findAndCountAll(selector);
      return {
        rows,
        count,
      };
    } else {
      let where = ` t2.group_id = :group_id and t1.publish_status=1 and t1.enabled=1 and t1.deleted = 0`;
      if (id !== undefined) {
        where += ` and t1.id=${id}`;
      }
      // 空字符串过滤
      if (spu_name !== undefined && !spu_name) {
        where += ` and t1.spu_name like '%${spu_name}%'`;
      }
      if (is_new !== undefined) {
        where += ` and t1.is_new=${is_new}`;
      }
      if (is_hot !== undefined) {
        where += ` and t1.is_hot=${is_hot}`;
      }
      if (is_recommend !== undefined) {
        where += ` and t1.is_recommend=${is_recommend}`;
      }
      if (brand_id !== undefined) {
        where += ` and t1.brand_id=${brand_id}`;
      }
      if (category_id !== undefined) {
        where += ` and t1.category_id=${category_id}`;
      }
      const offset = (pageNum - 1) * pageSize;
      const limit = pageSize;
      const sql = `select t1.* from t_product_spu as t1 left join t_product_group_relation as t2 on t1.id=t2.product_id where ${where} order by t1.sort,t1.id desc LIMIT :offset,:limit`;

      const count_sql = `select count(*) as count from t_product_spu as t1 left join t_product_group_relation as t2 on t1.id=t2.product_id where ${where}`;

      const rows = await this.sequelize.query(sql, {
        replacements: {
          group_id,
          offset,
          limit,
        },
        raw: true,
        type: QueryTypes.SELECT,
      });

      const { count } = await this.sequelize.query(count_sql, {
        replacements: {
          group_id,
          offset,
          limit,
        },
        raw: true,
        plain: true, // 加这个只返回对象
        type: QueryTypes.SELECT,
      });

      return { rows, count };
    }
  }

  // 获取商品详情

  async getGoodsDetail(requestBody: GetGoodsSpuDTO) {
    const { id, extra_sku, attributes } = requestBody;
    // where 条件拼装
    const where: any = {
      id,
      enabled: 1,
    };

    // 组装sequelize option
    let selector: FindAndCountOptions = {
      attributes,
      where,
      raw: true,
    };

    selector = _.pickBy(selector, _.identity);

    const product: any = await this.tProductSpu.findOne(selector);

    if (!product) {
      throw new Error(`当前商品不存在或已下架!`);
    }

    if (extra_sku) {
      product.sku_list = await this.tProductSku.findAll({
        where: {
          product_id: id,
          enabled: 1,
        },
      });
      for (const sku of product.sku_list) {
        const stock = await this.cacheService.incrby(
          `${CacheKey.SKU_STOCK}_${sku.id}`,
          0,
        );
        const lock_stock = await this.cacheService.incrby(
          `${CacheKey.SKU_LOCK_STOCK}_${sku.id}`,
          0,
        );
        sku.stock = stock || sku.stock;
        sku.lock_stock = lock_stock || sku.lock_stock;
      }
    }
    return product;
  }

  // 根据查询商品分组

  async getGoodsGroupByCode(requestBody: GetGoodsGroupByCodeDTO): Promise<any> {
    const { position_code, group_id, attributes, pageNum, pageSize, order } =
      requestBody;

    // 组装sequelize option
    let selector: FindAndCountOptions = {
      attributes,
      where: {
        group_id,
        position_code,
        enabled: 1,
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
      order,
      raw: true,
    };
    selector = JSON.parse(JSON.stringify(selector));

    const { rows, count } = await this.tProductGroup.findAndCountAll(selector);
    return { rows, count };
  }

  // 根据查询分组商品topN

  async getGroupGoodsLimit(requestBody: GetGoodsGroupByCodeDTO): Promise<any> {
    const { position_code_list } = requestBody;

    // 组装sequelize option
    let selector: FindAndCountOptions = {
      attributes: ['id', 'group_name', 'position_code', 'album_pics'],
      where: {
        position_code: position_code_list
          ? position_code_list.map((c) => c.position_code)
          : undefined,
        enabled: 1,
      },
      raw: true,
    };

    selector = JSON.parse(JSON.stringify(selector));

    const rows: any = await this.tProductGroup.findAll(selector);

    if (rows.length) {
      const sql_template = `( select t1.group_id,t2.id,t2.spu_name,t2.sale_price,t2.pic_url from t_product_group_relation t1 left join t_product_spu t2 on t1.product_id = t2.id
      where t1.group_id = ? order by t1.sort,t1.id desc limit ? ) `;
      const sql = [];
      rows.forEach((row) => {
        if (position_code_list.length) {
          const { limit } = position_code_list.find(
            (c) => c.position_code === row.position_code,
          );
          sql.push(sql_template.replace('?', row.id).replace('?', limit + ''));
        }
      });

      const group_item: any = await this.sequelize.query(
        sql.join(' union all '),
        {
          raw: true,
          type: QueryTypes.SELECT,
        },
      );

      rows.forEach((item) => {
        item.children = group_item.filter((c) => c.group_id === item.id);
      });
    }
    return { rows };
  }
}
