import { BasicController } from './basic.controller';
import type { BasicService } from './basic.service';

function build() {
  const svc = {
    getDictionary: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
    sendCode: jest.fn().mockResolvedValue(undefined),
    verifyCode: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<BasicService>;
  return { controller: new BasicController(svc), svc };
}

describe('BasicController', () => {
  it('getDictionary delegates to service', async () => {
    const { controller, svc } = build();
    const body = { page_num: 1, page_size: 10 } as never;
    const out = await controller.getDictionary(body);
    expect(svc.getDictionary).toHaveBeenCalledWith(body);
    expect(out).toEqual({ rows: [], count: 0 });
  });

  it('sendCode delegates to service', async () => {
    const { controller, svc } = build();
    const body = { mobile: '13900000000', sms_type: 'register' } as never;
    await controller.sendCode(body);
    expect(svc.sendCode).toHaveBeenCalledWith(body);
  });

  it('verifyCode delegates to service', async () => {
    const { controller, svc } = build();
    const body = { mobile: '13900000000', sms_type: 'register', code: '1234' } as never;
    await controller.verifyCode(body);
    expect(svc.verifyCode).toHaveBeenCalledWith(body);
  });
});
