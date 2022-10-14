import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('CatsController', () => {
  let httpService: HttpService;
  const client_id = '';
  const base_url = 'http://api.vv-tool.com';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
  });

  const getToken = async () => {
    const url = ``;
    const res_data = await httpService.axiosRef.post(
      url,
      {
        appkey: client_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 25000,
      },
    );
    const { code, data, msg } = res_data.data;
    if (code !== 0) {
      throw new Error(msg);
    }
    return data;
  };

  const parseVtoolItemData = (origin_data: any) => {
    if (!origin_data.data) {
      origin_data.data = {
        item: origin_data.item,
      };
    }
    if (!origin_data.item_price && origin_data.price) {
      origin_data.item_price = origin_data.price;
    }

    if (origin_data.api_stack && origin_data.api_stack[0]) {
      let globalData = JSON.parse(origin_data.api_stack[0].value);
      if (globalData.global && globalData.global.data) {
        globalData = globalData.global.data;
      }
      const { price, delivery, skuBase, skuCore, consumerProtection } =
        globalData;

      if (!origin_data.item_price && price) {
        origin_data.item_price = {
          price: {
            price_text: price.price.priceText,
          },
        };
      }
      if (!origin_data.delivery && delivery) {
        origin_data.delivery = delivery;
      }

      if (
        (!origin_data.consumer_protection ||
          !origin_data.consumer_protection.items) &&
        consumerProtection
      ) {
        origin_data.consumer_protection = consumerProtection;
      }

      if (!origin_data.sku_core && skuCore) {
        skuCore.sku_item = skuCore.skuItem;
        const skuKeys = Object.keys(skuCore.sku2info);
        skuKeys.forEach((skuKey) => {
          const sku = skuCore.sku2info[skuKey];
          sku.price.price_money = sku.price.priceMoney;
          sku.price.price_text = sku.price.priceText;
          sku.logistics_time = sku.logisticsTime;
          sku.price.price_money = sku.price.priceMoney;
          sku.quantity_text = sku.quantityText;
        });
        origin_data.sku_core = skuCore;
      }

      if (!origin_data.sku_base && skuBase) {
        skuBase.skus = skuBase.skus.map((sku) => {
          return {
            sku_id: sku.skuId,
            prop_path: sku.propPath,
          };
        });
        origin_data.sku_base = skuBase;
      }
    }
    delete origin_data.api_stack;
    return origin_data;
  };

  const getGoodsDetail = async ({ goods_id, token }): Promise<any> => {
    const url = `${base_url}/tool/accounts/item-info-low-price?url=${goods_id}`;
    const res_data = await httpService.axiosRef.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      timeout: 25000,
    });
    const { code, data, msg } = res_data.data;
    if (code !== 0) {
      throw new Error(msg);
    }
    if (msg === '商品不存在') {
      return null;
    }
    return parseVtoolItemData(data);
  };

  describe('vTools', () => {
    it('getGoodsDetail', async () => {
      const token = await getToken();
      const data = await getGoodsDetail({ goods_id: '562231266281', token });
      console.log(data);
    });
  });
});
