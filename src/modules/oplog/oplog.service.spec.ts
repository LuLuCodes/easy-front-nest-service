import type { Queue } from 'bullmq';
import type { Repository } from 'typeorm';

import { OpLogService } from './oplog.service';
import type { UserOplog } from '@entities/index';

function build() {
  const queue = { add: jest.fn().mockResolvedValue(undefined) } as unknown as jest.Mocked<Queue>;
  const repo = {
    findAndCount: jest.fn().mockResolvedValue([[{ id: 1 }], 1]),
    create: jest.fn((x: Partial<UserOplog>) => x),
    save: jest.fn().mockResolvedValue({}),
  } as unknown as jest.Mocked<Repository<UserOplog>>;
  return { svc: new OpLogService(queue, repo), queue, repo };
}

describe('OpLogService', () => {
  describe('createLogTask', () => {
    it('enqueues a bullmq job with retry options', async () => {
      const { svc, queue } = build();
      await svc.createLogTask({ user_id: 1, target_id: 1, action_desc: 'x' } as never);
      expect(queue.add).toHaveBeenCalledWith(
        'oplog',
        expect.objectContaining({ action_desc: 'x' }),
        expect.objectContaining({ attempts: 3, removeOnComplete: true, removeOnFail: true }),
      );
    });
  });

  describe('queryLog', () => {
    it('applies Like filters for action_desc and action_user, paginates and returns rows+count', async () => {
      const { svc, repo } = build();
      const out = await svc.queryLog({
        target_type: 1 as never,
        action_desc: 'login',
        action_user: 'leyi',
        page_num: 2,
        page_size: 5,
      } as never);
      expect(out.count).toBe(1);
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.skip).toBe(5);
      expect(args.take).toBe(5);
      expect(args.order).toEqual({ id: 'DESC' });
    });

    it('omits nil filters and uses defaults', async () => {
      const { svc, repo } = build();
      await svc.queryLog({ target_type: 1 as never } as never);
      const args = (repo.findAndCount as jest.Mock).mock.calls[0][0];
      expect(args.where.action_desc).toBeUndefined();
      expect(args.skip).toBe(0);
      expect(args.take).toBe(10);
    });
  });

  describe('writeOpLog', () => {
    it('persists with default audit fields', async () => {
      const { svc, repo } = build();
      await svc.writeOpLog({ action_desc: 'x' });
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ action_desc: 'x', created_by: 1, updated_by: 1 }),
      );
      expect(repo.save).toHaveBeenCalled();
    });

    it('swallows persistence errors via the logger (no rethrow)', async () => {
      const { svc, repo } = build();
      (repo.save as jest.Mock).mockRejectedValueOnce(new Error('db down'));
      const errSpy = jest
        .spyOn((svc as unknown as { logger: { error: jest.Mock } }).logger, 'error')
        .mockImplementation(() => undefined);
      await expect(svc.writeOpLog({ action_desc: 'x' })).resolves.toBeUndefined();
      expect(errSpy).toHaveBeenCalled();
    });
  });

  describe('log', () => {
    it('does not throw on object args', () => {
      const { svc } = build();
      const logSpy = jest
        .spyOn((svc as unknown as { logger: { log: jest.Mock } }).logger, 'log')
        .mockImplementation(() => undefined);
      svc.log('msg', { a: 1 });
      svc.log('msg-2', 'string-arg');
      expect(logSpy).toHaveBeenCalledTimes(2);
    });
  });
});
