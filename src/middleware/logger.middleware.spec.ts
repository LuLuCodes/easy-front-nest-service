import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    // Silence the embedded Logger so failure modes don't spam test output.
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
      connection: { remoteAddress: '5.6.7.8' },
      ip: '7.7.7.7',
      method: 'GET',
      originalUrl: '/api/x',
      session: {},
      params: {},
      query: {},
      body: { a: 1 },
    };
    const res = {
      statusCode,
      write: jest.fn(),
      end: jest.fn(),
    };
    return { req, res };
  }

  it('calls next() and patches res.write / res.end', () => {
    const { req, res } = fakeReqRes(200);
    const originalWrite = res.write;
    const next = jest.fn();
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.write).not.toBe(originalWrite);
  });

  it('routes 5xx responses to logger.error', () => {
    const { req, res } = fakeReqRes(500);
    const errSpy = (middleware as unknown as { logger: { error: jest.Mock } }).logger.error;
    middleware.use(req, res, jest.fn());
    res.end('boom');
    expect(errSpy).toHaveBeenCalled();
  });

  it('routes 4xx to warn and 2xx to log', () => {
    const warnSpy = (middleware as unknown as { logger: { warn: jest.Mock } }).logger.warn;
    const logSpy = (middleware as unknown as { logger: { log: jest.Mock } }).logger.log;

    const { req: r1, res: res1 } = fakeReqRes(404);
    middleware.use(r1, res1, jest.fn());
    res1.end('not found');
    expect(warnSpy).toHaveBeenCalled();

    const { req: r2, res: res2 } = fakeReqRes(200);
    middleware.use(r2, res2, jest.fn());
    res2.end('ok');
    expect(logSpy).toHaveBeenCalled();
  });
});
