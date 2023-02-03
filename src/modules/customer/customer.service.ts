import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { uuid, makeSalt } from '@libs/cryptogram';
import { invitationCode } from '@libs/util';
import {
  LoginByWeChatDTO,
  BindPhoneAndEmailDTO,
  CreateOrUpdateAddressDTO,
  GetAddressDTO,
  CreateOrUpdateCartItemDTO,
  UpdateCartItemStatusDTO,
  GetCustomerDTO,
  BindSuperiorsDTO,
} from './customer.dto';
import {
  TAccount,
  TAccountLoginLog,
  TAccountPlatform,
  TCustomer,
  TCustomerAddress,
  TCartItem,
  TCustomerRelation,
} from '@models/index';
import * as _ from 'lodash';

@Injectable()
export class CustomerService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    @InjectModel(TAccount)
    private readonly tAccount: typeof TAccount,
    @InjectModel(TAccountLoginLog)
    private readonly tAccountLoginLog: typeof TAccountLoginLog,
    @InjectModel(TAccountPlatform)
    private readonly tAccountPlatform: typeof TAccountPlatform,
    @InjectModel(TCustomer)
    private readonly tCustomer: typeof TCustomer,
    @InjectModel(TCustomerAddress)
    private readonly tCustomerAddress: typeof TCustomerAddress,
    @InjectModel(TCartItem)
    private readonly tCartItem: typeof TCartItem,
    @InjectModel(TCustomerRelation)
    private readonly tCustomerRelation: typeof TCustomerRelation,
  ) {}

  async loginByWeChat(requestBody: LoginByWeChatDTO, headers): Promise<any> {
    const { wx_openid, wx_unionid, type, auto_register, ...extra_info } =
      requestBody;
    const platform_accout = await this.tAccountPlatform.findOne({
      attributes: ['id', 'account_code', 'gender', 'nick_name', 'avatar_url'],
      where: {
        type,
        wx_openid,
        wx_unionid,
      },
      raw: true,
    });
    if (!platform_accout && !auto_register) {
      throw new Error('当前账号未注册，请先注册');
    }

    if (!platform_accout && auto_register) {
      const result = await this.sequelize.transaction(async (t) => {
        const accout = await this.tAccount.create(
          {
            account_code: uuid(),
            status: 1,
            creator_id: 1,
          },
          { transaction: t },
        );
        await this.tAccountPlatform.create(
          {
            account_code: accout.account_code,
            creator_id: accout.id,
            type,
            wx_openid,
            wx_unionid,
            ...extra_info,
          },
          { transaction: t },
        );
        const customer = await this.tCustomer.create(
          {
            account_code: accout.account_code,
            customer_code: uuid(),
            level: 0,
            creator_id: accout.id,
            ...extra_info,
          },
          { transaction: t },
        );
        await this.tCustomer.update(
          {
            invitation_code: invitationCode(customer.id),
          },
          {
            where: {
              id: customer.id,
            },
            transaction: t,
          },
        );
        return {
          accout_id: accout.id,
          account_code: accout.account_code,
          customer_id: customer.id,
          customer_code: customer.customer_code,
          wx_openid,
          wx_unionid,
        };
      });
      return result;
    }
    if (platform_accout) {
      const result = await this.sequelize.transaction(async (t) => {
        const accout = await this.tAccount.findOne({
          attributes: ['id', 'account_code'],
          where: {
            account_code: platform_accout.account_code,
          },
          raw: true,
          transaction: t,
        });
        await this.tAccountPlatform.update(
          {
            ...extra_info,
            creator_id: accout.id,
          },
          {
            where: { id: platform_accout.id },
            transaction: t,
          },
        );
        await this.tCustomer.update(
          {
            ...extra_info,
            creator_id: accout.id,
          },
          {
            where: { account_code: platform_accout.account_code },
            transaction: t,
          },
        );
        const customer = await this.tCustomer.findOne({
          attributes: ['id', 'customer_code'],
          where: {
            account_code: platform_accout.account_code,
          },
          raw: true,
          transaction: t,
        });
        return {
          accout_id: accout.id,
          account_code: accout.account_code,
          customer_id: customer.id,
          customer_code: customer.customer_code,
          wx_openid,
          wx_unionid,
        };
      });
      this.tAccountLoginLog.create({
        account_code: result.account_code,
        last_login_time: Date.now(),
        last_login_ip: headers['x-real-ip'] || '',
        user_agent: headers['user-agent'],
        creator_id: result.accout_id,
      });
      return result;
    }
  }

  async bindPhoneAndEmail(
    requestBody: BindPhoneAndEmailDTO,
    user,
  ): Promise<any> {
    const { account_id, phone, email } = requestBody;
    const account = await this.tAccount.findOne({
      attributes: ['id'],
      where: {
        id: account_id,
      },
    });
    if (!account) {
      throw new Error('当前账号不存在');
    }

    account.phone = phone;
    account.email = email;
    account.creator_id = user.id;
    await account.save();
    return;
  }

  async setAddress(requestBody: CreateOrUpdateAddressDTO, user) {
    const { id } = requestBody;
    const body: any = { ...requestBody };
    body.creator_id = user.id;
    body.customer_id = user.customer_id;

    const [attribute, created] = await this.tCustomerAddress.findOrCreate({
      where: {
        id,
        customer_id: user.customer_id,
      },
      defaults: body,
    });
    if (created) {
      return { id: attribute.id };
    }
    await this.tCustomerAddress.update(body, {
      where: {
        id,
      },
    });
    return { id };
  }

  async getAddress(requestBody: GetAddressDTO, user) {
    const { customer_id } = user;
    const { is_default, id, pageNum, pageSize, order, attributes } =
      requestBody;
    // where 条件拼装
    let where: any = {
      id,
      customer_id,
      is_default: is_default,
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

    const { rows, count } = await this.tCustomerAddress.findAndCountAll(
      selector,
    );
    return {
      rows,
      count,
    };
  }

  async setCartItem(requestBody: CreateOrUpdateCartItemDTO, user) {
    const { customer_id } = user;
    const { id, product_id, sku_id } = requestBody;

    const sql = `select spu.id as product_id, sku.id as sku_id, sku.sale_price as sku_sale_price from t_product_spu as spu,t_product_sku as  sku where spu.id=:product_id and spu.id = sku.product_id and sku.id=:sku_id limit 1`;
    const row: any = await this.sequelize.query(sql, {
      replacements: { product_id, sku_id },
      raw: true,
      type: QueryTypes.SELECT,
      plain: true,
    });
    if (!row) {
      throw new Error('该商品已下架');
    }
    const { sku_sale_price } = row;
    const body: any = { ...requestBody };
    body.creator_id = user.id;
    body.customer_id = customer_id;
    body.price = sku_sale_price;
    const [attribute, created] = await this.tCartItem.findOrCreate({
      where: {
        id,
        product_id,
        sku_id,
        customer_id,
      },
      defaults: body,
    });
    let responseBody = null;
    if (created) {
      responseBody = {
        id: attribute.id,
      };
    } else {
      const udate_data: any = {
        enabled: body.enabled,
        deleted: body.deleted,
      };
      if (body.quantity) {
        udate_data.quantity = Sequelize.literal(`quantity + ${body.quantity}`);
      }
      await this.tCartItem.update(udate_data, {
        where: {
          id,
          customer_id,
        },
      });
      responseBody = {
        id,
      };
    }
    return responseBody;
  }

  async updateCartItemStatus(
    requestBody: UpdateCartItemStatusDTO,
    user: any,
  ): Promise<any> {
    const { customer_id } = user;
    const { cart_item_id_list, ...others } = requestBody;
    const body: any = { ...others, creator_id: user.id };

    const [affected_num] = await this.tCartItem.update(body, {
      where: { customer_id, id: { [Op.in]: cart_item_id_list } },
    });
    return { affected_num };
  }

  // 获取用户购物车

  async getCart(requestBody: GetCustomerDTO, user) {
    const { customer_id } = user;
    const { id_list } = requestBody;
    const where: any = { customer_id };
    let whereSql = ` where t1.customer_id = :customer_id `;
    if (id_list && id_list.length) {
      whereSql += ` and t1.id in (:id_list) `;
      where.id_list = id_list;
    }
    const sql = `select t1.id,t1.quantity,t1.price,t2.spu_name,t2.pic_url,t2.publish_status,t3.sale_price,t3.sp_data,t3.enabled,t3.pic_url as sku_pic_url,t3.stock,t3.lock_stock
    from t_cart_item t1 left join t_product_spu t2 on t1.product_id = t2.id
    left join t_product_sku t3 on t1.sku_id = t3.id
    ${whereSql} and t1.enabled = 1 and t1.deleted = 0  order by t1.id desc limit 100`;
    const rows = await this.sequelize.query(sql, {
      replacements: where,
      raw: true,
      type: QueryTypes.SELECT,
    });

    return { rows, count: rows.length };
  }

  // 获取用户购物车

  async getCustomer(requestBody: GetCustomerDTO, user) {
    console.log('user', user);
    const { customer_id } = user;
    const { attributes } = requestBody;
    // where 条件拼装
    // 组装sequelize option
    let selector: FindAndCountOptions = {
      where: { id: customer_id },
      raw: true,
      attributes,
    };

    selector = _.pickBy(selector, _.identity);

    const result = await this.tCustomer.findOne(selector);
    return result;
  }

  // 绑定上下级关系

  async bindSuperiors(requestBody: BindSuperiorsDTO, user): Promise<any> {
    const { superiors_invitation_code } = requestBody;
    let { superiors_customer_id } = requestBody;
    const { customer_id } = user;
    if (!superiors_customer_id && !superiors_invitation_code) {
      throw new Error('缺少上级客户编码或邀请码');
    }

    const relation = await this.tCustomer.findOne({
      attributes: ['id'],
      where: {
        customer_id,
      },
      raw: true,
    });
    if (relation) {
      throw new Error('关系已绑定，请勿重复绑定');
    }

    if (!superiors_customer_id) {
      const customer = await this.tCustomer.findOne({
        attributes: ['id'],
        where: {
          invitation_code: superiors_invitation_code,
        },
        raw: true,
      });
      if (!customer) {
        throw new Error('邀请码不存在');
      }
      superiors_customer_id = customer.id;
    }

    await this.tCustomerRelation.create({
      customer_id,
      inviter_id: superiors_customer_id,
      enabled: 1,
      creator_id: customer_id,
    });
    return;
  }
}
