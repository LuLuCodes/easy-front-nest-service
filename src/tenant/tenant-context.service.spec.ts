import { TenantContextService } from './tenant-context.service';
import { SYSTEM_TENANT_ID } from './constants';
import type { TenantContext } from './types/tenant-context';

describe('TenantContextService', () => {
  let svc: TenantContextService;

  beforeEach(() => {
    svc = new TenantContextService();
  });

  const ctx: TenantContext = {
    tenantId: 7,
    userId: 42,
    accountId: 'tester',
    roles: ['admin'],
    permissions: ['p1'],
    isSuperAdmin: false,
  };

  it('returns undefined outside a run scope', () => {
    expect(svc.get()).toBeUndefined();
    expect(svc.tenantId()).toBe(SYSTEM_TENANT_ID);
    expect(svc.isSuperAdmin()).toBe(false);
  });

  it('exposes the active context inside a run scope', () => {
    svc.run(ctx, () => {
      expect(svc.get()).toEqual(ctx);
      expect(svc.tenantId()).toBe(7);
      expect(svc.require()).toEqual(ctx);
      expect(svc.isSuperAdmin()).toBe(false);
    });
    expect(svc.get()).toBeUndefined();
  });

  it('require throws when called without a context', () => {
    expect(() => svc.require()).toThrow(/Tenant context not initialized/);
  });

  it('isolates concurrent contexts via AsyncLocalStorage', async () => {
    const seen: number[] = [];
    await Promise.all(
      [1, 2, 3].map((id) =>
        svc.run({ ...ctx, tenantId: id }, async () => {
          await new Promise((r) => setTimeout(r, 1));
          seen.push(svc.tenantId());
        }),
      ),
    );
    expect(seen.sort()).toEqual([1, 2, 3]);
  });

  it('honors super-admin flag through tenantId / isSuperAdmin helpers', () => {
    svc.run({ ...ctx, isSuperAdmin: true }, () => {
      expect(svc.isSuperAdmin()).toBe(true);
    });
  });
});
