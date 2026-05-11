import { In } from 'typeorm';
import type { Repository } from 'typeorm';

import { BasicService } from './basic.service';
import type { CacheService } from '@service/cache.service';
import type { SmsCoreService } from '@service/sms-core.service';
import type { Dictionary } from '@entities/index';

function build() {
  const cache = {} as unknown as CacheService;
  const sms = {
    sendCode: jest.fn().mockResolvedValue(undefined),
    checkCode: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<SmsCoreService>;
  const repo = {
    findAndCount: jest.fn().mockResolvedValue([[{ id: 1 }], 1]),
  } as unknown as jest.Mocked<Repository<Dictionary>>;
  return { svc: new BasicService(cache, sms, repo), sms, repo };
}

describe('BasicService', () => {
  describe('getDictionary', () => {
    it('returns rows + count with default pagination', async () => {
      const { svc, repo } = build();
      const out = await svc.getDictionary({ page_num: 1, page_size: 10 } as never);
      expect(out).toEqual({ rows: [{ id: 1 }], count: 1 });
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.skip).toBe(0);
      expect(args.take).toBe(10);
      expect(args.where).toBeUndefined();
      expect(args.order).toEqual({ id: 'DESC' });
    });

    it('filters by id when supplied', async () => {
      const { svc, repo } = build();
      await svc.getDictionary({ id: 42, page_num: 1, page_size: 10 } as never);
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.where).toEqual({ id: 42 });
    });

    it('filters by field_name_list via In() clause', async () => {
      const { svc, repo } = build();
      await svc.getDictionary({
        field_name_list: ['kind', 'color'],
        page_num: 2,
        page_size: 5,
      } as never);
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.where).toEqual({ field_name: In(['kind', 'color']) });
      expect(args.skip).toBe(5);
    });

    it('passes attribute select-list through', async () => {
      const { svc, repo } = build();
      await svc.getDictionary({
        attributes: ['id', 'field_name'],
        page_num: 1,
        page_size: 10,
      } as never);
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.select).toEqual(['id', 'field_name']);
    });
  });

  describe('SMS proxies', () => {
    it('sendCode forwards mobile + sms_type to the core service', async () => {
      const { svc, sms } = build();
      await svc.sendCode({ mobile: '13900000000', sms_type: 'register' } as never);
      expect(sms.sendCode).toHaveBeenCalledWith('13900000000', 'register');
    });

    it('verifyCode forwards mobile + sms_type + code', async () => {
      const { svc, sms } = build();
      await svc.verifyCode({
        mobile: '13900000000',
        sms_type: 'register',
        code: '6789',
      } as never);
      expect(sms.checkCode).toHaveBeenCalledWith('13900000000', 'register', '6789');
    });
  });
});
