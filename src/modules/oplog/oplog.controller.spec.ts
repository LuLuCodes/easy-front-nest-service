import { OpLogController } from './oplog.controller';
import type { OpLogService } from './oplog.service';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';

function build() {
  const svc = {
    queryLog: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
    createLogTask: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<OpLogService>;
  return { controller: new OpLogController(svc), svc };
}

describe('OpLogController', () => {
  it('queryOpLog forwards body and current user', async () => {
    const { controller, svc } = build();
    const body = { target_type: 1 } as never;
    const user = { id: 5 } as unknown as AuthenticatedUser;
    const out = await controller.queryOpLog(body, user);
    expect(svc.queryLog).toHaveBeenCalledWith(body, user);
    expect(out).toEqual({ rows: [], count: 0 });
  });

  it('testWriteLog forwards body to createLogTask', async () => {
    const { controller, svc } = build();
    const body = { user_id: 1, target_id: 1 } as never;
    await controller.testWriteLog(body);
    expect(svc.createLogTask).toHaveBeenCalledWith(body);
  });
});
