import type { Repository } from 'typeorm';

import { SmsCoreService } from './sms-core.service';
import type { CacheService } from './cache.service';
import type { DictCacheService } from './dict-cache.service';
import { BusinessException } from '@common/exceptions/business-exception';
import { SMS_STATUS, SMS_TYPE } from '@dto/EnumDTO';
import type { SmsLog } from '@entities/index';

jest.mock('@libs/sms', () => {
  const send = jest.fn();
  return {
    SmsFactory: { create: jest.fn(() => ({ send })) },
    __send: send,
  };
});

import * as smsLib from '@libs/sms';
const sendMock = (smsLib as unknown as { __send: jest.Mock }).__send;
const factoryMock = smsLib.SmsFactory.create as jest.Mock;

const dictConf = (overrides: Record<string, unknown> = {}) => [
  {
    field_value: JSON.stringify({
      app_key: 'k',
      app_secret: 's',
      渠道: '阿里云',
      签名: 'sig',
      模板: { [SMS_TYPE.验证码]: 'TPL_001', [SMS_TYPE.通用]: 'TPL_999' },
      ...overrides,
    }),
  },
];

function buildSvc() {
  const cache = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<CacheService>;
  const dict = {
    getDictConf: jest.fn().mockResolvedValue(dictConf()),
  } as unknown as jest.Mocked<DictCacheService>;
  const smsRepo = {
    save: jest.fn(async (e: SmsLog) => ({ ...e, id: 42 })),
    create: jest.fn((e: Partial<SmsLog>) => e as SmsLog),
    findOne: jest.fn(),
    update: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<Repository<SmsLog>>;
  return { svc: new SmsCoreService(cache, dict, smsRepo), cache, dict, smsRepo };
}

describe('SmsCoreService.sendCode', () => {
  beforeEach(() => {
    sendMock.mockReset();
    factoryMock.mockReset();
    factoryMock.mockImplementation(() => ({ send: sendMock }));
  });

  it('throws BusinessException when cache key still alive (rate-limit)', async () => {
    const { svc, cache } = buildSvc();
    (cache.get as jest.Mock).mockResolvedValueOnce(Date.now());
    await expect(svc.sendCode('13800000000')).rejects.toBeInstanceOf(BusinessException);
  });

  it('throws when dict has no sms config', async () => {
    const { svc, dict } = buildSvc();
    (dict.getDictConf as jest.Mock).mockResolvedValueOnce([]);
    await expect(svc.sendCode('13800000000')).rejects.toMatchObject({
      message: '短信未配置',
    });
  });

  it('throws when sms factory returns null (unsupported channel)', async () => {
    const { svc } = buildSvc();
    factoryMock.mockReturnValueOnce(null);
    await expect(svc.sendCode('13800000000')).rejects.toMatchObject({
      message: expect.stringContaining('不支持的短信渠道'),
    });
  });

  it('throws when template missing for type', async () => {
    const { svc, dict } = buildSvc();
    (dict.getDictConf as jest.Mock).mockResolvedValueOnce(dictConf({ 模板: {} }));
    await expect(svc.sendCode('13800000000')).rejects.toMatchObject({
      message: expect.stringContaining('未找到'),
    });
  });

  it('throws when upstream send fails', async () => {
    const { svc } = buildSvc();
    sendMock.mockResolvedValueOnce({ success: false, err_msg: 'aliyun down' });
    await expect(svc.sendCode('13800000000')).rejects.toMatchObject({
      message: 'aliyun down',
    });
  });

  it('persists log + sets rate-limit cache on success', async () => {
    const { svc, cache, smsRepo } = buildSvc();
    sendMock.mockResolvedValueOnce({ success: true, err_msg: '' });

    const id = await svc.sendCode('13800000000');

    expect(id).toBe(42);
    expect(smsRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        mobile: '13800000000',
        sms_type: String(SMS_TYPE.验证码),
        sms_param: expect.stringMatching(/^\d+$/),
      }),
    );
    expect(cache.set).toHaveBeenCalledWith(expect.any(String), expect.any(Number), 'EX', 59);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        template_code: 'TPL_001',
        sign_name: 'sig',
        phones: '13800000000',
      }),
    );
  });

  it('skips code generation for non-验证码 sms_type', async () => {
    const { svc, smsRepo } = buildSvc();
    sendMock.mockResolvedValueOnce({ success: true, err_msg: '' });

    await svc.sendCode('13800000000', SMS_TYPE.通用);

    expect(smsRepo.create).toHaveBeenCalledWith(expect.objectContaining({ sms_param: undefined }));
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ template_code: 'TPL_999', template_param: null }),
    );
  });
});

describe('SmsCoreService.checkCode', () => {
  it('throws when code is empty', async () => {
    const { svc } = buildSvc();
    await expect(svc.checkCode('13800000000', SMS_TYPE.验证码, '')).rejects.toMatchObject({
      message: '短信参数有误',
    });
  });

  it('throws when no matching pending sms row', async () => {
    const { svc, smsRepo } = buildSvc();
    (smsRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    await expect(svc.checkCode('13800000000', SMS_TYPE.验证码, '1234')).rejects.toMatchObject({
      message: '验证码不存在或已使用',
    });
  });

  it('throws when sms is expired', async () => {
    const { svc, smsRepo } = buildSvc();
    (smsRepo.findOne as jest.Mock).mockResolvedValueOnce({
      id: 1,
      expire_time: new Date(Date.now() - 60_000),
      sms_param: '1234',
    });
    await expect(svc.checkCode('13800000000', SMS_TYPE.验证码, '1234')).rejects.toMatchObject({
      message: '验证码已过期',
    });
  });

  it('throws when code mismatch', async () => {
    const { svc, smsRepo } = buildSvc();
    (smsRepo.findOne as jest.Mock).mockResolvedValueOnce({
      id: 1,
      expire_time: new Date(Date.now() + 60_000),
      sms_param: '1234',
    });
    await expect(svc.checkCode('13800000000', SMS_TYPE.验证码, '9999')).rejects.toMatchObject({
      message: '验证码不正确',
    });
  });

  it('marks row 已验证 on success', async () => {
    const { svc, smsRepo } = buildSvc();
    (smsRepo.findOne as jest.Mock).mockResolvedValueOnce({
      id: 1,
      expire_time: new Date(Date.now() + 60_000),
      sms_param: '1234',
    });
    await svc.checkCode('13800000000', SMS_TYPE.验证码, '1234');
    expect(smsRepo.update).toHaveBeenCalledWith(
      { id: 1 },
      expect.objectContaining({ msg_status: SMS_STATUS.已验证 }),
    );
  });
});
