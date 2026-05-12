import { firstValueFrom, of } from 'rxjs';
import * as otelApi from '@opentelemetry/api';

import type { TenantContextService } from '@tenant/tenant-context.service';
import { TenantSpanInterceptor } from './tenant-span.interceptor';

describe('TenantSpanInterceptor', () => {
  function makeCtx() {
    return {} as never;
  }
  function makeNext<T>(value: T) {
    return { handle: () => of(value) };
  }

  it('is a no-op when no active span exists', async () => {
    jest.spyOn(otelApi.trace, 'getActiveSpan').mockReturnValue(undefined);
    const ctxSvc: TenantContextService = {
      tenantId: jest.fn(),
      isSuperAdmin: jest.fn(),
    } as never;
    const interceptor = new TenantSpanInterceptor(ctxSvc);
    const result = await firstValueFrom(interceptor.intercept(makeCtx(), makeNext('ok')));
    expect(result).toBe('ok');
    expect(ctxSvc.tenantId).not.toHaveBeenCalled();
  });

  it('stamps tenant.id + tenant.is_super_admin on the active span', async () => {
    const span = { setAttribute: jest.fn() };
    jest.spyOn(otelApi.trace, 'getActiveSpan').mockReturnValue(span as never);
    const ctxSvc: TenantContextService = {
      tenantId: jest.fn().mockReturnValue(42),
      isSuperAdmin: jest.fn().mockReturnValue(false),
    } as never;
    const interceptor = new TenantSpanInterceptor(ctxSvc);
    await firstValueFrom(interceptor.intercept(makeCtx(), makeNext('ok')));
    expect(span.setAttribute).toHaveBeenCalledWith('tenant.id', 42);
    expect(span.setAttribute).toHaveBeenCalledWith('tenant.is_super_admin', false);
  });

  it('swallows TenantContextService throws (public/no-tenant routes)', async () => {
    const span = { setAttribute: jest.fn() };
    jest.spyOn(otelApi.trace, 'getActiveSpan').mockReturnValue(span as never);
    const ctxSvc: TenantContextService = {
      tenantId: jest.fn().mockImplementation(() => {
        throw new Error('no tenant context');
      }),
      isSuperAdmin: jest.fn(),
    } as never;
    const interceptor = new TenantSpanInterceptor(ctxSvc);
    const result = await firstValueFrom(interceptor.intercept(makeCtx(), makeNext('ok')));
    expect(result).toBe('ok');
    expect(span.setAttribute).not.toHaveBeenCalled();
  });
});
