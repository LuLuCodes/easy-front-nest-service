import { CREDENTIAL_PROVIDER } from '@entities/index';

import { CredentialController } from './credential.controller';
import type { CredentialService } from './credential.service';
import type { TenantCredentialVault } from './credential-vault.service';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';

function makeUser(id = 1): AuthenticatedUser {
  return {
    id,
    account_id: 'admin',
    tenant_id: 0,
    is_super_admin: true,
  } as unknown as AuthenticatedUser;
}

function build() {
  const credSvc = {
    create: jest.fn().mockResolvedValue({
      id: 1,
      credential_tenant_id: 7,
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-1',
      display_name: 'wx',
      status: 'active',
    }),
    list: jest.fn().mockResolvedValue([]),
    updateStatus: jest.fn().mockResolvedValue({
      id: 1,
      credential_tenant_id: 7,
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-1',
      status: 'disabled',
    }),
    rotateSecret: jest.fn().mockResolvedValue({
      id: 1,
      credential_tenant_id: 7,
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-1',
      key_version: 2,
    }),
  } as unknown as jest.Mocked<CredentialService>;
  const vault = {
    invalidate: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<TenantCredentialVault>;
  return { controller: new CredentialController(credSvc, vault), credSvc, vault };
}

describe('CredentialController', () => {
  it('create persists then invalidates the vault entry', async () => {
    const { controller, credSvc, vault } = build();
    const dto = {
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-1',
      secret: 's',
    } as never;
    const out = await controller.create(7, dto, makeUser(9));
    expect(credSvc.create).toHaveBeenCalledWith(7, dto, 9);
    expect(vault.invalidate).toHaveBeenCalledWith(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-1');
    expect(out.id).toBe(1);
    expect(out.status).toBe('active');
  });

  it('list forwards optional provider filter', async () => {
    const { controller, credSvc } = build();
    await controller.list(7, CREDENTIAL_PROVIDER.wx_oa);
    expect(credSvc.list).toHaveBeenCalledWith(7, CREDENTIAL_PROVIDER.wx_oa);
  });

  it('updateStatus invalidates with the row tenant + provider + app_id', async () => {
    const { controller, credSvc, vault } = build();
    await controller.updateStatus(1, { status: 'disabled' } as never, makeUser(9));
    expect(credSvc.updateStatus).toHaveBeenCalledWith(1, { status: 'disabled' }, 9);
    expect(vault.invalidate).toHaveBeenCalledWith(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-1');
  });

  it('rotate returns the new key_version + invalidates vault', async () => {
    const { controller, credSvc, vault } = build();
    const r = await controller.rotate(1, { secret: 'new' } as never, makeUser(9));
    expect(credSvc.rotateSecret).toHaveBeenCalledWith(1, { secret: 'new' }, 9);
    expect(vault.invalidate).toHaveBeenCalledWith(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-1');
    expect(r.key_version).toBe(2);
  });
});
