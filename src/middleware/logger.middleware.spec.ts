import { EventEmitter } from 'node:events';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    jest
      .spyOn((middleware as unknown as { logger: { error: jest.Mock } }).logger, 'error')
      .mockImplementation(() => undefined);
    jest
      .spyOn((middleware as unknown as { logger: { warn: jest.Mock } }).logger, 'warn')
      .mockImplementation(() => undefined);
    jest
      .spyOn((middleware as unknown as { logger: { log: jest.Mock } }).logger, 'log')
      .mockImplementation(() => undefined);
  });

  function fakeReqRes(statusCode: number) {
    const req = {
      headers: { 'x-forwarded-for': '1.2.3.4', 'user-agent': 'jest', referer: 'r' },
      socket: { remoteAddress: '5.6.7.8' },
      method: 'GET',
      url: '/api/x',
    } as unknown as IncomingMessage;
    const res = Object.assign(new EventEmitter(), {
      statusCode,
    }) as unknown as ServerResponse;
    return { req, res };
  }

  it('calls next() and attaches a finish listener', () => {
    const { req, res } = fakeReqRes(200);
    const next = jest.fn();
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
    expect((res as unknown as EventEmitter).listenerCount('finish')).toBe(1);
  });

  it('routes 5xx responses to logger.error on finish', () => {
    const errSpy = (middleware as unknown as { logger: { error: jest.Mock } }).logger.error;
    const { req, res } = fakeReqRes(500);
    middleware.use(req, res, jest.fn());
    (res as unknown as EventEmitter).emit('finish');
    expect(errSpy).toHaveBeenCalled();
  });

  it('routes 4xx to warn and 2xx to log', () => {
    const warnSpy = (middleware as unknown as { logger: { warn: jest.Mock } }).logger.warn;
    const logSpy = (middleware as unknown as { logger: { log: jest.Mock } }).logger.log;

    const { req: r1, res: res1 } = fakeReqRes(404);
    middleware.use(r1, res1, jest.fn());
    (res1 as unknown as EventEmitter).emit('finish');
    expect(warnSpy).toHaveBeenCalled();

    const { req: r2, res: res2 } = fakeReqRes(200);
    middleware.use(r2, res2, jest.fn());
    (res2 as unknown as EventEmitter).emit('finish');
    expect(logSpy).toHaveBeenCalled();
  });
});
