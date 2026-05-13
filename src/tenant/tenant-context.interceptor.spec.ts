import { of, lastValueFrom, firstValueFrom, throwError } from 'rxjs';
import type { CallHandler, ExecutionContext } from '@nestjs/common';

import { TenantContextInterceptor } from './tenant-context.interceptor';
import { TenantContextService } from './tenant-context.service';
import { SYSTEM_TENANT_ID } from './constants';

function buildHost(user: unknown) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as unknown as ExecutionContext;
}

describe('TenantContextInterceptor', () => {
  let svc: TenantContextService;
  let interceptor: TenantContextInterceptor;

  beforeEach(() => {
    svc = new TenantContextService();
    interceptor = new TenantContextInterceptor(svc);
  });

  it('hydrates context from authenticated user and exposes it during downstream handler', async () => {
    const captured: { tenantId?: number; isSuperAdmin?: boolean } = {};
    const next: CallHandler = {
      handle: () => {
        const ctx = svc.get();
        captured.tenantId = ctx?.tenantId;
        captured.isSuperAdmin = ctx?.isSuperAdmin;
        return of('ok');
      },
    };

    const host = buildHost({
      tenant_id: 42,
      id: 7,
      account_id: 'a-7',
      roles: ['admin'],
      permissions: ['p1', 'p2'],
      is_super_admin: true,
    });

    const out = await lastValueFrom(interceptor.intercept(host, next));
    expect(out).toBe('ok');
    expect(captured.tenantId).toBe(42);
    expect(captured.isSuperAdmin).toBe(true);
  });

  it('falls back to SYSTEM_TENANT_ID + empty roles when request has no user', async () => {
    const captured: { tenantId?: number; roles?: string[] } = {};
    const next: CallHandler = {
      handle: () => {
        const ctx = svc.get();
        captured.tenantId = ctx?.tenantId;
        captured.roles = ctx?.roles;
        return of('ok');
      },
    };

    await lastValueFrom(interceptor.intercept(buildHost(undefined), next));
    expect(captured.tenantId).toBe(SYSTEM_TENANT_ID);
    expect(captured.roles).toEqual([]);
  });

  it('propagates downstream errors through the wrapped Observable', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => new Error('boom')),
    };
    await expect(firstValueFrom(interceptor.intercept(buildHost(undefined), next))).rejects.toThrow(
      'boom',
    );
  });

  it('coerces is_super_admin to false when value is not strictly true', async () => {
    const captured: { isSuperAdmin?: boolean } = {};
    const next: CallHandler = {
      handle: () => {
        captured.isSuperAdmin = svc.get()?.isSuperAdmin;
        return of('ok');
      },
    };

    await lastValueFrom(
      interceptor.intercept(
        buildHost({
          tenant_id: 1,
          id: 1,
          account_id: 'x',
          roles: [],
          permissions: [],
          is_super_admin: 1,
        }),
        next,
      ),
    );
    expect(captured.isSuperAdmin).toBe(false);
  });
});
