import { ResponseCode } from '@config/global';

import { BusinessException } from './business-exception';

describe('BusinessException', () => {
  it('defaults code to SYS_ERROR', () => {
    const err = new BusinessException('login failed');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(BusinessException);
    expect(err.message).toBe('login failed');
    expect(err.code).toBe(ResponseCode.SYS_ERROR);
    expect(err.name).toBe('BusinessException');
  });

  it('accepts an explicit response code', () => {
    const err = new BusinessException('param invalid', ResponseCode.PARM_ERROR);
    expect(err.code).toBe(ResponseCode.PARM_ERROR);
  });

  it('preserves stack trace through the constructor', () => {
    const err = new BusinessException('boom');
    expect(err.stack).toContain('BusinessException');
    // stack should not include the BusinessException constructor frame
    // itself thanks to captureStackTrace.
    expect(err.stack?.split('\n')[1]).toContain('business-exception.spec.ts');
  });
});
