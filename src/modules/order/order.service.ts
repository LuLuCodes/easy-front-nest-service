import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import {
  AddOrderDTO,
  PayOrderDTO,
  QueryPayResultDTO,
  WX_TRADE_STATE,
  ORDER_STATUS,
  PAY_TYPE,
  AddOrderFromCartDTO,
  CancelOrderDTO,
  GetOrderDTO,
} from './order.dto';

import {
  WXPayCoreFactory,
  WXPayCore,
  WXPAY_DOMAIN,
  WXPAY_TRADE_TYPE,
  WXPAY_API_URL,
  SIGN_TYPE,
  SIGN_KEY_TYPE,
  REQUEST_METHOD,
} from '@easy-front-core-sdk/wxpay';
import { WXCoreFactory, WXCore } from '@easy-front-core-sdk/wx';
import { MPCoreFactory, MPCore } from '@easy-front-core-sdk/miniprogram';
import { Kit } from '@easy-front-core-sdk/kits';
import {
  TOrder,
  TOrderItem,
  TCartItem,
  TProductSpu,
  TProductSku,
  TCustomerAddress,
  TOrderPayLog,
} from '@models/index';
import { randomNo } from '@libs/util';
import { CacheKey, LockKey } from '@config/global';
import { RedisLock } from '@libs/redlock';
import { BigNumber } from 'bignumber.js';
import { dateFormat } from '@libs/util';
import * as util from 'util';

@Injectable()
export class OrderService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    private httpService: HttpService,
    @InjectQueue('order-timeout-close-queue') private orderTOCloseQueue: Queue,
    @InjectModel(TOrder)
    private readonly tOrder: typeof TOrder,
    @InjectModel(TOrderItem)
    private readonly tOrderItem: typeof TOrderItem,
    @InjectModel(TCartItem)
    private readonly tCartItem: typeof TCartItem,
    @InjectModel(TProductSpu)
    private readonly tProductSpu: typeof TProductSpu,
    @InjectModel(TProductSku)
    private readonly tProductSku: typeof TProductSku,
    @InjectModel(TCustomerAddress)
    private readonly tCustomerAddress: typeof TCustomerAddress,
    @InjectModel(TOrderPayLog)
    private readonly tOrderPayLog: typeof TOrderPayLog,
  ) {
    // products.belongsTo(user, { foreignKey: 'userId', targetKey: 'userId', as: 'u' });
    // this.tOrder.hasMany(this.tOrderItem);
    // this.tOrderItem.belongsToMany(this.tOrder, { through: 'order_item', foreignKey: 'order_id', targetKey: 'id' });
    // this.tOrderItem.belongsToMany(this.tOrder, { through: 'Order_Item' });
  }

  async addOrder(requestBody: AddOrderDTO, user): Promise<any> {
    const { customer_id } = user;
    const { product_id, sku_id, quantity, address_id, note } = requestBody;
    let address = null;
    if (address_id) {
      address = await this.tCustomerAddress.findOne({
        attributes: ['id', 'name', 'phone', 'pcd_code', 'pcd_desc', 'address'],
        where: {
          id: address_id,
          customer_id,
        },
        raw: true,
      });
      if (!address) {
        throw new Error('请选择收货地址');
      }
    }
    const sql = `select 
    spu.id as product_id, 
    spu.spu_name as product_name, 
    spu.pic_url as product_pic_url, 
    spu.stock as product_stock, 
    spu.lock_stock as product_lock_stock, 
    sku.id as sku_id, 
    sku.stock as sku_stock, 
    sku.lock_stock as sku_lock_stock, 
    sku.sale_price as sku_sale_price, 
    sku.pic_url as sku_pic_url, 
    sku.sp_data as sku_sp_data 
    from t_product_spu as spu,t_product_sku as sku 
    where spu.id=:product_id and 
    spu.id = sku.product_id and 
    sku.id=:sku_id and 
    sku.enabled = 1 and 
    sku.deleted= 0 limit 1`;
    const rows = await this.sequelize.query(sql, {
      replacements: { product_id, sku_id },
      raw: true,
      type: QueryTypes.SELECT,
    });
    if (!rows || !rows.length) {
      throw new Error('该商品库存不足');
    }
    const row: any = rows[0];
    const {
      product_name,
      product_pic_url,
      product_stock,
      product_lock_stock,
      sku_sale_price,
      sku_pic_url,
      sku_sp_data,
    } = row;
    let { sku_stock, sku_lock_stock } = row;
    const redlock = RedisLock.getLock();
    let lock = null;
    try {
      const result = await this.sequelize.transaction(async (t) => {
        lock = await redlock.lock(`${LockKey.SKU_LOCK}_${sku_id}`, 2000);
        const stock = await this.cacheService.incrby(
          `${CacheKey.SKU_STOCK}_${sku_id}`,
          0,
        );
        const lock_stock = await this.cacheService.incrby(
          `${CacheKey.SKU_LOCK_STOCK}_${sku_id}`,
          0,
        );
        sku_stock = stock || sku_stock;
        sku_lock_stock = lock_stock || sku_lock_stock;
        const sku_available_lock = sku_stock - sku_lock_stock;
        if (quantity > sku_available_lock) {
          throw new Error('商品库存不足');
        }
        const price = new BigNumber(sku_sale_price);
        const total_amount = price.multipliedBy(quantity);
        let order_data: any = {
          order_sn: `O${randomNo(3)}${customer_id}`,
          customer_id,
          total_amount,
          pay_amount: total_amount,
          pay_type: PAY_TYPE.UNKONW,
          order_status: ORDER_STATUS.WAIT_PAY,
          creator_id: customer_id,
          note: note || '',
        };
        if (address) {
          order_data = {
            ...order_data,
            receiver_name: address.name,
            receiver_phone: address.phone,
            receiver_pcd_code: address.pcd_code,
            receiver_pcd_desc: address.pcd_desc,
            receiver_detail_address: address.address,
          };
        }
        const order = await this.tOrder.create(order_data, { transaction: t });

        await this.tOrderItem.create(
          {
            order_id: order.id,
            product_id,
            sku_id,
            product_pic_url,
            product_name,
            sku_pic_url,
            sku_sp_data,
            price,
            quantity,
            creator_id: customer_id,
          },
          { transaction: t },
        );
        await this.tProductSpu.update(
          { stock: product_lock_stock + quantity },
          { where: { id: product_id }, transaction: t },
        );
        await this.tProductSku.update(
          { stock: sku_lock_stock + quantity },
          { where: { id: sku_id }, transaction: t },
        );
        await this.cacheService.incrby(
          `${CacheKey.SKU_LOCK_STOCK}_${sku_id}`,
          quantity,
        );
        await lock.unlock();
        return {
          order_id: order.id,
          order_sn: order.order_sn,
          amount: total_amount,
        };
      });

      // 这只是个demo，通过异步延迟队列实现30分钟未支付订单自动关闭
      // this.orderTOCloseQueue.add(
      //   {
      //     topic: 'order-timeout-close',
      //     order_id: result.order_id,
      //   },
      //   {
      //     attempts: 3,
      //     delay: 180000,
      //     jobId: `order-timeout-close@#_#@${result.order_id}@#_#@${Date.now()}`,
      //     removeOnComplete: true,
      //     removeOnFail: true,
      //   },
      // );
      return result;
    } catch (error) {
      if (lock && lock.expiration) {
        await lock.unlock();
      }
      throw error;
    }
  }

  async payOrder(requestBody: PayOrderDTO, user): Promise<any> {
    const { customer_id } = user;
    const { order_id, pay_type, wxpay_trade_type } = requestBody;
    const order = await this.tOrder.findOne({
      attributes: ['id', 'order_sn', 'pay_amount'],
      where: {
        id: order_id,
        customer_id,
      },
      raw: true,
    });
    if (!order) {
      throw new Error('订单不存在');
    }
    const order_item = await this.tOrderItem.findOne({
      attributes: ['id', 'product_name'],
      where: {
        order_id: order_id,
      },
      raw: true,
    });
    if (!order_item) {
      throw new Error('订单不存在');
    }
    if (pay_type === PAY_TYPE.WXPAY && wxpay_trade_type === 'MINI') {
      return await this.wxPayOrder(order, order_item, user);
    } else {
      throw new Error('不支持该支付方式');
    }
  }

  private async wxPayOrder(
    order: any,
    order_item: any,
    user: any,
  ): Promise<any> {
    const { wx_openid } = user;
    const mpCore: MPCore = MPCoreFactory.getCore();
    const wxPayCore: WXPayCore = WXPayCoreFactory.getCore();
    const wxPayConfig = wxPayCore.getApiConfig();
    const mpConfig = mpCore.getApiConfig();
    const { mchId } = wxPayConfig;
    const { appId } = mpConfig;
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const notify_url = await this.cacheService.get(
      `${CacheKey.WX_PAY_NOTIFY_URL}_wx_pay_mchid`,
    );
    const response = await wxPayCore.post(
      WXPAY_DOMAIN.CHINA,
      WXPAY_API_URL.JS_API_PAY,
      JSON.stringify({
        appid: appId,
        mchid: mchId,
        description: `${order_item.product_name.substring(0, 32)}...`,
        out_trade_no: order.order_sn,
        time_expire: dateFormat(now, 'yyyy-MM-ddThh:mm:ss+08:00'),
        attach: `${order.id}`,
        notify_url,
        amount: { total: order.pay_amount * 100 },
        payer: { openid: wx_openid },
      }),
    );

    if (response.status !== 200) {
      throw new Error(`error code ${response.status}`);
    }
    const { prepay_id } = response.data;
    const timeStamp = Date.now();
    const nonceStr = Kit.generateStr();
    const sign = wxPayCore.createSign([
      appId,
      `${timeStamp}`,
      nonceStr,
      `prepay_id=${prepay_id}`,
    ]);
    await this.tOrder.update(
      { prepay_id, pay_type: PAY_TYPE.WXPAY },
      {
        where: {
          id: order.id,
        },
      },
    );
    return {
      timeStamp: `${timeStamp}`,
      nonceStr,
      signType: 'RSA',
      package: `prepay_id=${prepay_id}`,
      paySign: sign,
    };
  }

  async queryPayResult(requestBody: QueryPayResultDTO, user): Promise<any> {
    const { order_sn, pay_type } = requestBody;
    const { customer_id } = user;
    const order = await this.tOrder.findOne({
      attributes: ['id'],
      where: {
        order_sn,
        customer_id,
        order_status: {
          [Op.gt]: ORDER_STATUS.WAIT_PAY,
        },
      },
      raw: true,
    });
    if (order) {
      return;
    }
    if (pay_type === PAY_TYPE.WXPAY) {
      return await this.queryWxPayResult(requestBody, user);
    } else {
      throw new Error('不支持该支付方式');
    }
  }

  private async queryWxPayResult(
    requestBody: QueryPayResultDTO,
    user,
  ): Promise<any> {
    const { customer_id } = user;
    const { order_sn } = requestBody;
    const mpCore: MPCore = MPCoreFactory.getCore();
    const wxPaycore: WXPayCore = WXPayCoreFactory.getCore();
    const wxPayConfig = wxPaycore.getApiConfig();
    const mpConfig = mpCore.getApiConfig();
    const { mchId } = wxPayConfig;
    const { appId } = mpConfig;

    const params = new Map();
    params.set('mchid', mchId);
    const response = await wxPaycore.get(
      WXPAY_DOMAIN.CHINA,
      util.format(WXPAY_API_URL.ORDER_QUERY_BY_NO, order_sn),
      params,
    );
    if (response.status !== 200) {
      throw new Error(`error code ${response.status}`);
    }
    const {
      appid,
      mchid,
      attach,
      out_trade_no,
      transaction_id,
      trade_state,
      success_time,
      payer,
      amount,
    } = response.data;
    if (appid !== appId) {
      throw new Error('非本微信主体订单');
    }
    if (mchid !== mchId) {
      throw new Error('非本微信商户号订单');
    }
    if (trade_state !== WX_TRADE_STATE.SUCCESS) {
      throw new Error('支付失败');
    }
    let { payer_total, total } = amount;
    payer_total = payer_total / 100;
    total = total / 100;
    const order_id = parseInt(attach);
    const result = await this.sequelize.transaction(async (t) => {
      await this.tOrderPayLog.create(
        {
          order_id,
          pay_type: PAY_TYPE.WXPAY,
          trade_no: transaction_id,
          pay_amount: payer_total,
          pay_time: success_time,
          buyer_no: payer.openid,
          creator_id: customer_id,
        },
        { transaction: t },
      );
      if (payer_total >= total) {
        await this.tOrder.update(
          { order_status: ORDER_STATUS.WAIT_DELIVER },
          { where: { id: order_id }, transaction: t },
        );
      }
      return;
    });
    return result;
  }

  async wxPayCallback(requestBody: any): Promise<any> {
    try {
      const { event_type, resource } = requestBody;
      if (event_type !== 'TRANSACTION.SUCCESS') {
        throw new Error('非支付成功回调');
      }
      const { ciphertext, nonce, associated_data } = resource;

      const mpCore: MPCore = MPCoreFactory.getCore();
      const wxPaycore: WXPayCore = WXPayCoreFactory.getCore();
      const wxPayConfig = wxPaycore.getApiConfig();
      const mpConfig = mpCore.getApiConfig();
      const { mchId } = wxPayConfig;
      const { appId } = mpConfig;

      let pay_result: any = wxPaycore.dencryptCiphertext(
        ciphertext,
        associated_data,
        nonce,
      );
      // console.log(`pay_result:${pay_result}`);
      pay_result = JSON.parse(pay_result);
      const {
        appid,
        mchid,
        attach,
        transaction_id,
        trade_state,
        success_time,
        payer,
        amount,
      } = pay_result;
      // console.log(`appid:${appid}-${appId}`);
      if (appid !== appId) {
        return { code: 'APPID_NOT_MACTH', message: `${appid}-${appId}` };
      }
      // console.log(`mchid:${mchid}-${mchId}`);
      if (mchid !== mchId) {
        return { code: 'MCHID_NOT_MACTH', message: `${mchid}-${mchId}` };
      }
      // console.log(`trade_state-${trade_state}`);
      if (trade_state !== WX_TRADE_STATE.SUCCESS) {
        return { code: 'WX_TRADE_STATE_NO_SUCCESS', message: `${trade_state}` };
        return;
      }
      let { payer_total, total } = amount;
      payer_total = payer_total / 100;
      total = total / 100;
      const order_id = parseInt(attach);
      const log = await this.tOrderPayLog.findOne({
        attributes: ['id'],
        where: {
          order_id,
          trade_no: transaction_id,
        },
        raw: true,
      });
      // 如果存在相同的支付
      if (log) {
        return { code: 'SUCCESS', message: `REPEAT ${transaction_id}` };
      }
      // console.log(`log`);
      const result = await this.sequelize.transaction(async (t) => {
        await this.tOrderPayLog.create(
          {
            order_id,
            pay_type: PAY_TYPE.WXPAY,
            trade_no: transaction_id,
            pay_amount: payer_total,
            pay_time: success_time,
            buyer_no: payer.openid,
            creator_id: 1,
          },
          { transaction: t },
        );
        if (payer_total >= total) {
          await this.tOrder.update(
            { order_status: ORDER_STATUS.WAIT_DELIVER },
            { where: { id: order_id }, transaction: t },
          );
        }
        return;
      });
      // console.log(`result`, JSON.stringify(result));
      return { code: 'SUCCESS', message: '' };
    } catch (error) {
      return { code: 'CALL_BACK_ERROR', message: error.message };
    }
  }

  async addOrderFromCart(requestBody: AddOrderFromCartDTO, user): Promise<any> {
    const { address_id, cart_item_id_list, note } = requestBody;
    const { customer_id } = user;
    let address = null;
    if (address_id) {
      address = await this.tCustomerAddress.findOne({
        attributes: ['id', 'name', 'phone', 'pcd_code', 'pcd_desc', 'address'],
        where: {
          id: address_id,
          customer_id,
        },
        raw: true,
      });
      if (!address) {
        throw new Error('请选择收货地址');
      }
    }

    const sql = `select cart.id as cart_id, cart.quantity as cart_quantity, cart.product_id as product_id, cart.sku_id as sku_id, spu.spu_name as product_name, 
    spu.pic_url as product_pic_url, 
    spu.stock as product_stock, 
    spu.lock_stock as product_lock_stock, 
    sku.stock as sku_stock, 
    sku.lock_stock as sku_lock_stock, 
    sku.sale_price as sku_sale_price, 
    sku.pic_url as sku_pic_url, 
    sku.sp_data as sku_sp_data from t_product_sku as sku left join t_cart_item as cart on cart.sku_id = sku.id and sku.enabled = 1 and sku.deleted = 0 left join t_product_spu as spu on spu.id=sku.product_id and spu.enabled=1 and spu.deleted=0  where cart.customer_id=${customer_id} and cart.id in (${cart_item_id_list.join()}) and cart.enabled = 1 and cart.deleted =0`;

    const rows = await this.sequelize.query(sql, {
      raw: true,
      type: QueryTypes.SELECT,
    });
    if (!rows || !rows.length) {
      throw new Error('该商品库存不足');
    }
    const redlock = RedisLock.getLock();
    let lock = null;
    try {
      let total_amount = new BigNumber(0);
      const order_item_list = [];
      const customr_cart_item_id_list = [];

      lock = await redlock.lock(`${LockKey.SKU_LOCK}`, 2000);
      for (let i = 0; i < rows.length; i++) {
        const row: any = rows[i];
        let { sku_stock, sku_lock_stock } = row;
        const { sku_id, cart_quantity } = row;
        const stock = await this.cacheService.incrby(
          `${CacheKey.SKU_STOCK}_${sku_id}`,
          0,
        );
        const lock_stock = await this.cacheService.incrby(
          `${CacheKey.SKU_LOCK_STOCK}_${sku_id}`,
          0,
        );
        sku_stock = stock || sku_stock;
        sku_lock_stock = lock_stock || sku_lock_stock;
        row.sku_stock = sku_stock;
        row.sku_lock_stock = sku_lock_stock;
        const sku_available_lock = sku_stock - sku_lock_stock;
        if (cart_quantity > sku_available_lock) {
          throw new Error('商品库存不足');
        }
      }
      for (let i = 0; i < rows.length; i++) {
        const row: any = rows[i];
        const {
          cart_id,
          cart_quantity,
          product_id,
          sku_id,
          product_name,
          product_lock_stock,
          product_pic_url,
          sku_sale_price,
          sku_pic_url,
          sku_sp_data,
          sku_lock_stock,
        } = row;
        row.sku_lock_stock = sku_lock_stock + cart_quantity;
        row.product_lock_stock = product_lock_stock + cart_quantity;
        customr_cart_item_id_list.push(cart_id);
        const price = new BigNumber(sku_sale_price);
        total_amount = total_amount.plus(price.multipliedBy(cart_quantity));
        order_item_list.push({
          product_id,
          sku_id,
          product_pic_url,
          product_name,
          sku_pic_url,
          sku_sp_data,
          price,
          quantity: cart_quantity,
          creator_id: customer_id,
        });
      }
      const result = await this.sequelize.transaction(async (t) => {
        const order_data: any = {
          order_sn: `O${randomNo(3)}${customer_id}`,
          customer_id,
          total_amount: total_amount.toNumber(),
          pay_amount: total_amount.toNumber(),
          pay_type: PAY_TYPE.UNKONW,
          order_status: ORDER_STATUS.WAIT_PAY,
          receiver_name: address.name,
          receiver_phone: address.phone,
          receiver_pcd_code: address.pcd_code,
          receiver_pcd_desc: address.pcd_desc,
          receiver_detail_address: address.address,
          creator_id: customer_id,
          note: note || '',
        };
        const order = await this.tOrder.create(order_data, {
          transaction: t,
        });
        for (const item of order_item_list) {
          item.order_id = order.id;
        }
        await this.tOrderItem.bulkCreate(order_item_list, {
          transaction: t,
        });
        for (let i = 0; i < rows.length; i++) {
          const row: any = rows[i];
          const { product_id, sku_id, product_lock_stock, sku_lock_stock } =
            row;
          await this.tProductSpu.update(
            { stock: product_lock_stock },
            { where: { id: product_id }, transaction: t },
          );
          await this.tProductSku.update(
            { stock: sku_lock_stock },
            { where: { id: sku_id }, transaction: t },
          );
        }
        await this.tCartItem.update(
          { enabled: 0, deleted: 1 },
          { where: { id: customr_cart_item_id_list }, transaction: t },
        );
        return {
          order_id: order.id,
          order_sn: order.order_sn,
          amount: total_amount,
        };
      });
      for (let i = 0; i < rows.length; i++) {
        const row: any = rows[i];
        const { cart_quantity, sku_id } = row;
        row.sku_stock = await this.cacheService.incrby(
          `${CacheKey.SKU_LOCK_STOCK}_${sku_id}`,
          cart_quantity,
        );
      }
      await lock.unlock();
      return result;
    } catch (error) {
      if (lock && lock.expiration) {
        await lock.unlock();
      }

      throw error;
    }
  }

  // 取消订单

  async cancelOrder(requestBody: CancelOrderDTO, user): Promise<any> {
    const { order_id } = requestBody;
    const { customer_id } = user;

    const order = await this.tOrder.findOne({
      attributes: ['id', 'order_status', 'cancel_status', 'confirm_status'],
      where: {
        id: order_id,
        customer_id,
      },
      raw: true,
    });
    if (!order) {
      throw new Error('订单不存在');
    }
    if (order.cancel_status === 1) {
      throw new Error('该订单已取消，不能重复取消');
    }
    if (order.order_status !== ORDER_STATUS.WAIT_PAY) {
      throw new Error('该订单已付款生效，无法取消，请申请退款');
    }
    const order_item_list = await this.sequelize.transaction(async (t) => {
      const order_item_list = await this.tOrderItem.findAll({
        attributes: ['id', 'product_id', 'sku_id', 'quantity'],
        where: {
          order_id,
        },
        raw: true,
        transaction: t,
      });
      await this.tOrderItem.update(
        {
          enabled: 0,
        },
        {
          where: {
            order_id,
          },
          transaction: t,
        },
      );
      for (const order_item of order_item_list) {
        await this.tProductSku.update(
          {
            lock_stock: Sequelize.literal(
              `lock_stock - ${order_item.quantity}`,
            ),
          },
          {
            where: {
              id: order_item.sku_id,
            },
          },
        );
        await this.tProductSpu.update(
          {
            lock_stock: Sequelize.literal(
              `lock_stock - ${order_item.quantity}`,
            ),
          },
          {
            where: {
              id: order_item.product_id,
            },
          },
        );
      }
      await this.tOrder.update(
        { cancel_status: 1 },
        {
          where: {
            id: order_id,
          },
          transaction: t,
        },
      );
      return order_item_list;
    });

    for (const order_item of order_item_list) {
      const { sku_id, quantity } = order_item;
      await this.cacheService.decrby(
        `${CacheKey.SKU_LOCK_STOCK}_${sku_id}`,
        quantity,
      );
    }
    return;
  }

  // 获取订单列表 start

  async getOrderList(requestBody: GetOrderDTO, user): Promise<any> {
    const { customer_id } = user;
    const query = requestBody;

    const limit = query.pageSize || 10;
    // 组装sequelize option
    let selector: FindAndCountOptions = {
      where: {
        customer_id: customer_id,
        order_status: query.order_status,
        id: query.order_id,
        order_sn: query.order_sn,
        cancel_status: query.cancel_status,
      },
      offset: query.pageNum ? (query.pageNum - 1) * limit : 0,
      limit,
      raw: true,
      attributes: query.attributes,
      order: [['id', 'desc']] || query.order,
    };

    selector = JSON.parse(JSON.stringify(selector));
    const { rows, count }: any = await this.tOrder.findAndCountAll(selector);

    if (rows.length && query.extra_sku) {
      const selectors2: any = {
        where: { order_id: rows.map((c) => c.id) },
        raw: true,
      };
      if (query.attributes_sku) {
        selectors2.attributes = query.attributes_sku;
      }
      const order_item_list = await this.tOrderItem.findAll(selectors2);
      rows.forEach((row) => {
        row.order_item = order_item_list.filter((c) => c.order_id === row.id);
      });
    }

    return { rows, count };
  }
  // 获取订单列表 end
}
