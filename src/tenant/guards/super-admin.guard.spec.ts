import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SUPER_ADMIN_KEY } from '../decorators/super-admin.decorator';
import { SuperAdminGuard } from './super-admin.guard';

function makeContext(user: Record<string, unknown> | undefined): ExecutionContext {
  return {
    getHandler: () => () => undefined,
    getClass: () => class {},
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as unknown as ExecutionContext;
}

describe('SuperAdminGuard', () => {
  it('passes through when @SuperAdminOnly metadata is absent', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(undefined),
    } as unknown as Reflector;
    const guard = new SuperAdminGuard(reflector);
    expect(guard.canActivate(makeContext({ is_super_admin: false }))).toBe(true);
  });

  it('grants when user.is_super_admin === true', () => {
    const reflector = {
      getAllAndOverride: jest.fn((key: string) => key === SUPER_ADMIN_KEY),
    } as unknown as Reflector;
    const guard = new SuperAdminGuard(reflector);
    expect(guard.canActivate(makeContext({ is_super_admin: true }))).toBe(true);
  });

  it('throws Forbidden when @SuperAdminOnly is set and user is not super-admin', () => {
    const reflector = {
      getAllAndOverride: jest.fn((key: string) => key === SUPER_ADMIN_KEY),
    } as unknown as Reflector;
    const guard = new SuperAdminGuard(reflector);
    expect(() => guard.canActivate(makeContext({ is_super_admin: false }))).toThrow(
      ForbiddenException,
    );
  });

  it('throws Forbidden when no user is attached', () => {
    const reflector = {
      getAllAndOverride: jest.fn((key: string) => key === SUPER_ADMIN_KEY),
    } as unknown as Reflector;
    const guard = new SuperAdminGuard(reflector);
    expect(() => guard.canActivate(makeContext(undefined))).toThrow(ForbiddenException);
  });
});
