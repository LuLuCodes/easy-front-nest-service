import { HttpStatus } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs';

import { TransformInterceptor } from './transform.interceptor';

function makeContext(req: Record<string, unknown> = {}, handler = (): unknown => undefined) {
  const res = { status: jest.fn() };
  const request = { body: {}, query: {}, ...req };
  return {
    ctx: {
      switchToHttp: () => ({ getRequest: () => request, getResponse: () => res }),
      getHandler: () => handler,
    } as never,
    res,
    request,
  };
}

describe('TransformInterceptor', () => {
  it('wraps the handler payload in OkResponse with request_id', async () => {
    const i = new TransformInterceptor();
    const { ctx, res, request } = makeContext();
    const next = { handle: () => of({ value: 1 }) };
    const out = await lastValueFrom(i.intercept(ctx, next));
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(out.data).toEqual({ value: 1 });
    expect(typeof out.request_id).toBe('string');
    expect((request.body as Record<string, unknown>).request_id).toBeDefined();
    expect((request.query as Record<string, unknown>).request_id).toBeDefined();
  });

  it('appends ef_author when body.ef_author is truthy', async () => {
    const i = new TransformInterceptor();
    const { ctx } = makeContext({ body: { ef_author: 1 }, query: {} });
    const next = { handle: () => of({ value: 1 }) };
    const out = await lastValueFrom(i.intercept(ctx, next));
    expect(out.data.ef_author).toBe('qian.qing@aliyun.com');
  });
});
