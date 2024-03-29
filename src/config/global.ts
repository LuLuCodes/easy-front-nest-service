export enum ResponseCode {
  OK = 0,
  PARM_ERROR = 1000,
  SIGN_ERROR = 1001,
  SYS_ERROR = 9999,
  UNKOWN_ERROR = 10000,
}
export enum LockKey {
  SKU_LOCK = 'SKU_LOCK',
}

export enum CacheKey {
  SKU_STOCK = 'SKU_STOCK',
  SKU_LOCK_STOCK = 'SKU_LOCK_STOCK',
  SESSION_USER = 'SESSION_USER',
  WX_PAY_NOTIFY_URL = 'WX_PAY_NOTIFY_URL',
  WX_PAY_REFUND_NOTIFY_URL = 'WX_PAY_REFUND_NOTIFY_URL',
  ALL_AREA = 'ALL_AREA',
  ALL_AREA_TREE = 'ALL_AREA_TREE_',
  WX_PAY_RECHARGE_NOTIFY_URL = 'WX_PAY_RECHARGE_NOTIFY_URL',
  WX_OPEN_APPID = 'WX_OPEN_APPID',
  ALI_PAY_NOTIFY_URL = 'ALI_PAY_NOTIFY_URL',
  ALI_PAY_REFUND_NOTIFY_URL = 'ALI_PAY_REFUND_NOTIFY_URL',
  ALI_PAY_RECHARGE_NOTIFY_URL = 'ALI_PAY_RECHARGE_NOTIFY_URL',
}

export const ex_attributes = {
  exclude: [
    'deleted_at',
    'created_at',
    'updated_at',
    'created_by',
    'updated_by',
  ],
};

export const ex_attributes2 = {
  exclude: ['deleted_at', 'created_by', 'updated_by'],
};
