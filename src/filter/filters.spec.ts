import { BadRequestException, HttpStatus } from '@nestjs/common';

import { AllExceptionsFilter } from './any-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';
import { OtherExceptionsFilter } from './other-exception.filter';
import { BusinessException } from '@common/exceptions/business-exception';
import { ResponseCode } from '@config/global';

function fakeHost(reqExtra: Record<string, unknown> = {}) {
  const response = {
    status: jest.fn().mockReturnThis(),
    header: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  const request = {
    originalUrl: '/api/test',
    method: 'POST',
    ip: '127.0.0.1',
    body: {},
    query: {},
    ...reqExtra,
  };
  return {
    response,
    request,
    host: {
      switchToHttp: () => ({
        getResponse: () => response,
        getRequest: () => request,
      }),
    },
  };
}

describe('HttpExceptionFilter', () => {
  it('forwards the HTTP status code and message as plain text JSON header', () => {
    const filter = new HttpExceptionFilter();
    const { response, host } = fakeHost();
    const ex = new BadRequestException('bad payload');
    filter.catch(ex, host as never);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.header).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');
    expect(response.send).toHaveBeenCalledWith('bad payload');
  });
});

describe('OtherExceptionsFilter', () => {
  it('wraps any error as a 200 OtherErrorResponse with request_id from body', () => {
    const filter = new OtherExceptionsFilter();
    const { response, host } = fakeHost({ body: { request_id: 'req-1' } });
    filter.catch(new Error('boom'), host as never);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith(expect.objectContaining({ request_id: 'req-1' }));
  });

  it('falls back to request_id from query when body is empty', () => {
    const filter = new OtherExceptionsFilter();
    const { response, host } = fakeHost({ query: { request_id: 'q-2' } });
    filter.catch(new Error('boom'), host as never);
    expect(response.send).toHaveBeenCalledWith(expect.objectContaining({ request_id: 'q-2' }));
  });

  it('uses HttpException status for the log line even though the wire response is 200', () => {
    const filter = new OtherExceptionsFilter();
    const { response, host } = fakeHost();
    filter.catch(new BadRequestException('nope'), host as never);
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it('renders BusinessException.code on the response envelope', () => {
    const filter = new OtherExceptionsFilter();
    const { response, host } = fakeHost();
    filter.catch(new BusinessException('账号不存在', ResponseCode.PARM_ERROR), host as never);
    expect(response.send).toHaveBeenCalledWith(
      expect.objectContaining({ code: ResponseCode.PARM_ERROR, msg: '账号不存在' }),
    );
  });

  it('falls back to SYS_ERROR code for plain Error', () => {
    const filter = new OtherExceptionsFilter();
    const { response, host } = fakeHost();
    filter.catch(new Error('boom'), host as never);
    expect(response.send).toHaveBeenCalledWith(
      expect.objectContaining({ code: ResponseCode.SYS_ERROR }),
    );
  });
});

describe('AllExceptionsFilter', () => {
  it('wraps a generic Error as a 200 ErrorResponse', () => {
    const filter = new AllExceptionsFilter();
    const { response, host } = fakeHost({ body: { request_id: 'r-3' } });
    filter.catch(new Error('kaboom'), host as never);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.header).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');
    expect(response.send).toHaveBeenCalledWith(expect.objectContaining({ request_id: 'r-3' }));
  });

  it('does not throw when both body and query are missing request_id', () => {
    const filter = new AllExceptionsFilter();
    const { response, host } = fakeHost();
    expect(() => filter.catch(new Error('x'), host as never)).not.toThrow();
    expect(response.send).toHaveBeenCalled();
  });
});
