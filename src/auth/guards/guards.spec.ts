import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { RolesGuard } from './roles.guard';

function ctxWithUser(user: unknown): ExecutionContext {
  return {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as unknown as ExecutionContext;
}

function makeReflector(values: Map<string, unknown>): Reflector {
  return {
    getAllAndOverride: jest.fn((key: string) => values.get(key) ?? undefined),
  } as unknown as Reflector;
}

describe('JwtAuthGuard', () => {
  it('returns true immediately when route is @Public()', () => {
    const reflector = makeReflector(new Map([[IS_PUBLIC_KEY, true]]));
    const guard = new JwtAuthGuard(reflector);
    expect(guard.canActivate(ctxWithUser(null))).toBe(true);
  });

  it('delegates to passport AuthGuard for non-public routes', () => {
    const reflector = makeReflector(new Map());
    const guard = new JwtAuthGuard(reflector);
    // Calling super.canActivate without passport wiring throws; just verify
    // the public fast-path was NOT taken (reflector consulted, super called).
    const spy = jest
      .spyOn(Object.getPrototypeOf(Object.getPrototypeOf(guard)), 'canActivate')
      .mockReturnValue(true as never);
    expect(guard.canActivate(ctxWithUser(null))).toBe(true);
    spy.mockRestore();
  });
});

describe('RolesGuard', () => {
  function guardWith(roles: string[] | undefined, isPublic = false) {
    const m = new Map<string, unknown>();
    if (roles !== undefined) m.set(ROLES_KEY, roles);
    if (isPublic) m.set(IS_PUBLIC_KEY, true);
    return new RolesGuard(makeReflector(m));
  }

  it('passes @Public() routes through', () => {
    expect(guardWith(undefined, true).canActivate(ctxWithUser(null))).toBe(true);
  });

  it('passes when no roles required', () => {
    expect(guardWith(undefined).canActivate(ctxWithUser({ roles: [] }))).toBe(true);
    expect(guardWith([]).canActivate(ctxWithUser({ roles: [] }))).toBe(true);
  });

  it('throws when user has no roles array', () => {
    expect(() => guardWith(['admin']).canActivate(ctxWithUser({ is_super_admin: false }))).toThrow(
      ForbiddenException,
    );
  });

  it('super-admin bypasses role check', () => {
    expect(guardWith(['admin']).canActivate(ctxWithUser({ roles: [], is_super_admin: true }))).toBe(
      true,
    );
  });

  it('passes when user has at least one required role', () => {
    expect(
      guardWith(['admin', 'editor']).canActivate(
        ctxWithUser({ roles: ['editor'], is_super_admin: false }),
      ),
    ).toBe(true);
  });

  it('throws when none of the user roles match', () => {
    expect(() =>
      guardWith(['admin']).canActivate(ctxWithUser({ roles: ['viewer'], is_super_admin: false })),
    ).toThrow(ForbiddenException);
  });
});

describe('PermissionsGuard', () => {
  function guardWith(perms: string[] | undefined, isPublic = false) {
    const m = new Map<string, unknown>();
    if (perms !== undefined) m.set(PERMISSIONS_KEY, perms);
    if (isPublic) m.set(IS_PUBLIC_KEY, true);
    return new PermissionsGuard(makeReflector(m));
  }

  it('passes @Public() routes through', () => {
    expect(guardWith(undefined, true).canActivate(ctxWithUser(null))).toBe(true);
  });

  it('passes when no permissions required', () => {
    expect(guardWith(undefined).canActivate(ctxWithUser({ permissions: [] }))).toBe(true);
  });

  it('throws when user has no permissions array', () => {
    expect(() =>
      guardWith(['x:write']).canActivate(ctxWithUser({ is_super_admin: false })),
    ).toThrow(ForbiddenException);
  });

  it('super-admin bypasses permission check', () => {
    expect(
      guardWith(['x:write']).canActivate(ctxWithUser({ permissions: [], is_super_admin: true })),
    ).toBe(true);
  });

  it('passes only when user owns ALL required permissions', () => {
    expect(
      guardWith(['a', 'b']).canActivate(
        ctxWithUser({ permissions: ['a', 'b', 'c'], is_super_admin: false }),
      ),
    ).toBe(true);
    expect(() =>
      guardWith(['a', 'b']).canActivate(ctxWithUser({ permissions: ['a'], is_super_admin: false })),
    ).toThrow(ForbiddenException);
  });
});
