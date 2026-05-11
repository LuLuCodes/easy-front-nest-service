import { TenantController } from './tenant.controller';
import type { TenantService } from './tenant.service';
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
  const svc = {
    createTenant: jest.fn().mockResolvedValue({ id: 11 }),
    listTenants: jest.fn().mockResolvedValue([{ id: 1 }]),
    findById: jest.fn().mockResolvedValue({ id: 1 }),
    updateTenant: jest.fn().mockResolvedValue({ id: 1, status: 'active' }),
    inviteUser: jest.fn().mockResolvedValue({ id: 1, user_id: 5 }),
    removeUser: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<TenantService>;
  return { controller: new TenantController(svc), svc };
}

describe('TenantController', () => {
  it('create passes actor id through', async () => {
    const { controller, svc } = build();
    await controller.create({ code: 'acme', name: 'Acme' } as never, makeUser(7));
    expect(svc.createTenant).toHaveBeenCalledWith({ code: 'acme', name: 'Acme' }, 7);
  });

  it('list delegates without args', async () => {
    const { controller, svc } = build();
    const r = await controller.list();
    expect(svc.listTenants).toHaveBeenCalled();
    expect(r).toEqual([{ id: 1 }]);
  });

  it('detail forwards id', async () => {
    const { controller, svc } = build();
    await controller.detail(42);
    expect(svc.findById).toHaveBeenCalledWith(42);
  });

  it('update forwards id, dto, and actor id', async () => {
    const { controller, svc } = build();
    await controller.update(3, { status: 'active' } as never, makeUser(9));
    expect(svc.updateTenant).toHaveBeenCalledWith(3, { status: 'active' }, 9);
  });

  it('invite forwards id, dto, and actor id', async () => {
    const { controller, svc } = build();
    await controller.invite(3, { user_id: 5, role_in_tenant: 'member' } as never, makeUser(9));
    expect(svc.inviteUser).toHaveBeenCalledWith(3, { user_id: 5, role_in_tenant: 'member' }, 9);
  });

  it('remove returns success envelope', async () => {
    const { controller, svc } = build();
    const r = await controller.remove(3, 5);
    expect(svc.removeUser).toHaveBeenCalledWith(3, 5);
    expect(r).toEqual({ success: true });
  });
});
