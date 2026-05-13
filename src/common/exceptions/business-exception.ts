import { ResponseCode } from '@config/global';

/**
 * Service-layer business exception.
 *
 * Distinguishes "the user asked for something invalid" (account doesn't
 * exist, role name collides, permission denied) from "the server is
 * broken" (config missing, third-party 500, DB unreachable).
 *
 * Filters can switch on `instanceof BusinessException` to render a
 * user-facing message at HTTP 200 with a stable `code`. Non-business
 * `Error` falls through to the generic system-error path.
 *
 * Carries a `code` for the response envelope; defaults to `SYS_ERROR`
 * for back-compat with the historical `throw new Error('...')` shape.
 * Callers that want a specific code (e.g. `PARM_ERROR`) can pass it.
 */
export class BusinessException extends Error {
  public readonly code: ResponseCode;

  constructor(message: string, code: ResponseCode = ResponseCode.SYS_ERROR) {
    super(message);
    this.name = 'BusinessException';
    this.code = code;
    // Maintain proper stack trace under V8.
    if (typeof (Error as { captureStackTrace?: unknown }).captureStackTrace === 'function') {
      (Error as { captureStackTrace: (target: object, ctor: object) => void }).captureStackTrace(
        this,
        BusinessException,
      );
    }
  }
}
