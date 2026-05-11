import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';
import * as cryptoJS from 'crypto-js';

import { SignGuard } from './sign.guard';

function makeContext(req: Record<string, unknown>) {
  return {
    switchToHttp: () => ({
      getRequest: () => req,
    }),
  } as never;
}

function signFor(body: string, url: string): string {
  const md5 = createHash('md5').update(body, 'utf8').digest('hex');
  return cryptoJS.AES.encrypt(md5, url).toString();
}

function makeGuard(whiteList: string[] = []) {
  const config = {
    get: jest.fn((key: string) => (key === 'while_list.sign' ? whiteList : undefined)),
  } as unknown as ConfigService;
  return new SignGuard(config);
}

describe('SignGuard', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  it('lets requests with x-from-source: swagger through', async () => {
    const guard = makeGuard();
    const ok = await guard.canActivate(
      makeContext({
        headers: { 'x-from-source': 'swagger' },
        path: '/api/anything',
        method: 'POST',
        body: { sign: 'x', timestamp: '1' },
      }),
    );
    expect(ok).toBe(true);
  });

  it('lets whitelisted urls through', async () => {
    const guard = makeGuard(['/api/oss/upload-oss']);
    const ok = await guard.canActivate(
      makeContext({
        headers: {},
        path: '/api/oss/upload-oss',
        method: 'POST',
        body: { sign: 'x', timestamp: '1' },
      }),
    );
    expect(ok).toBe(true);
  });

  it('rejects with 403 when sign is missing', async () => {
    const guard = makeGuard();
    await expect(
      guard.canActivate(
        makeContext({
          headers: {},
          path: '/api/x',
          method: 'POST',
          body: { timestamp: String(Date.now()) },
        }),
      ),
    ).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
  });

  it('rejects with 403 when timestamp is missing', async () => {
    const guard = makeGuard();
    await expect(
      guard.canActivate(
        makeContext({
          headers: {},
          path: '/api/x',
          method: 'POST',
          body: { sign: 'whatever' },
        }),
      ),
    ).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
  });

  it('rejects with 403 when timestamp drifts beyond 10 minutes (replay)', async () => {
    const guard = makeGuard();
    await expect(
      guard.canActivate(
        makeContext({
          headers: {},
          path: '/api/x',
          method: 'POST',
          body: { sign: 'whatever', timestamp: '0' },
        }),
      ),
    ).rejects.toThrow(HttpException);
  });

  it('accepts a correctly signed POST body', async () => {
    const guard = makeGuard();
    const url = '/api/test';
    const body: Record<string, unknown> = { foo: 'bar', timestamp: String(Date.now()) };
    const tmp = { ...body };
    body.sign = signFor(JSON.stringify(tmp), url);
    const ok = await guard.canActivate(
      makeContext({ headers: {}, path: url, method: 'POST', body }),
    );
    expect(ok).toBe(true);
  });

  it('rejects when the POST signature does not match', async () => {
    const guard = makeGuard();
    const url = '/api/test';
    const body = {
      foo: 'bar',
      timestamp: String(Date.now()),
      sign: signFor('different-body', url),
    };
    await expect(
      guard.canActivate(makeContext({ headers: {}, path: url, method: 'POST', body })),
    ).rejects.toThrow(HttpException);
  });
});
