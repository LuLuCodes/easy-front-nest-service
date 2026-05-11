import { AccessController } from './access.controller';
import type { AccessService } from './access.service';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';

function makeUser(over: Partial<AuthenticatedUser> = {}): AuthenticatedUser {
  return {
    id: 1,
    account_id: 'leyi',
    tenant_id: 1,
    is_super_admin: false,
    role_type: 1,
    roles: [],
    permissions: [],
    ...over,
  } as unknown as AuthenticatedUser;
}

function makeController(): { controller: AccessController; svc: jest.Mocked<AccessService> } {
  const svc = {
    editUser: jest.fn().mockResolvedValue('edit-user'),
    checkAccount: jest.fn().mockResolvedValue(true),
    createUserAccount: jest.fn().mockResolvedValue('create-user-account'),
    modifyUserPassword: jest.fn().mockResolvedValue('modify-password'),
    SetUserStatus: jest.fn().mockResolvedValue('set-user-status'),
    setRole: jest.fn().mockResolvedValue('set-role'),
    deleteRole: jest.fn().mockResolvedValue('delete-role'),
    setRight: jest.fn().mockResolvedValue('set-right'),
    deleteRight: jest.fn().mockResolvedValue('delete-right'),
    setUserRoleRelation: jest.fn().mockResolvedValue('set-user-role-relation'),
    setRoleRightRelation: jest.fn().mockResolvedValue('set-role-right-relation'),
    getUserRoleRight: jest.fn().mockResolvedValue('get-user-role-right'),
    getRoleRightList: jest.fn().mockResolvedValue('get-role-right-list'),
    getUserList: jest.fn().mockResolvedValue('get-user-list'),
    getRoleList: jest.fn().mockResolvedValue('get-role-list'),
    getRightList: jest.fn().mockResolvedValue('get-right-list'),
    checkUser: jest.fn().mockResolvedValue({ nick: 'leyi' }),
  } as unknown as jest.Mocked<AccessService>;
  const controller = new AccessController(svc);
  return { controller, svc };
}

describe('AccessController', () => {
  it('editUser delegates with current user id', async () => {
    const { controller, svc } = makeController();
    await controller.editUser({ nick: 'x' } as never, makeUser({ id: 7 }));
    expect(svc.editUser).toHaveBeenCalledWith({ nick: 'x' }, { id: 7 });
  });

  it('checkAccount forwards the request body', async () => {
    const { controller, svc } = makeController();
    const body = { account_id: 'a' } as never;
    await controller.checkAccount(body);
    expect(svc.checkAccount).toHaveBeenCalledWith(body);
  });

  it.each([
    ['createUserAccount', 'createUserAccount'],
    ['modifyUserPassword', 'modifyUserPassword'],
    ['setUserStatus', 'SetUserStatus'], // service uses Pascal-Set
    ['deleteRole', 'deleteRole'],
    ['setRight', 'setRight'],
    ['deleteRight', 'deleteRight'],
    ['setUserRoleRelation', 'setUserRoleRelation'],
    ['setRoleRightRelation', 'setRoleRightRelation'],
    ['getUserRoleRight', 'getUserRoleRight'],
  ] as const)('%s passes body + { id } to service.%s', async (route, method) => {
    const { controller, svc } = makeController();
    const body = { x: 1 } as never;
    await (
      controller as unknown as Record<string, (b: never, u: AuthenticatedUser) => Promise<unknown>>
    )[route](body, makeUser({ id: 42 }));
    expect(svc[method]).toHaveBeenCalledWith(body, expect.objectContaining({ id: 42 }));
  });

  it('setRole also forwards the caller nick (account_id)', async () => {
    const { controller, svc } = makeController();
    await controller.setRole({} as never, makeUser({ id: 5, account_id: 'leyi' }));
    expect(svc.setRole).toHaveBeenCalledWith({}, { id: 5, nick: 'leyi' });
  });

  it.each([
    ['getRoleRightList', 'getRoleRightList'],
    ['getUserList', 'getUserList'],
    ['getRoleList', 'getRoleList'],
    ['getRightList', 'getRightList'],
  ] as const)('%s is a read-only delegate (body only)', async (route, method) => {
    const { controller, svc } = makeController();
    const body = { keyword: 'k' } as never;
    await (controller as unknown as Record<string, (b: never) => Promise<unknown>>)[route](body);
    expect(svc[method]).toHaveBeenCalledWith(body);
  });

  describe('getSession', () => {
    it('returns empty when no user attached', async () => {
      const { controller } = makeController();
      const out = await controller.getSession(undefined as unknown as AuthenticatedUser);
      expect(out).toEqual({});
    });

    it('merges checkUser fill into the user identity', async () => {
      const { controller, svc } = makeController();
      const out = await controller.getSession(makeUser({ id: 9, account_id: 'leyi' }));
      expect(out).toMatchObject({ id: 9, account_id: 'leyi', nick: 'leyi' });
      expect(svc.checkUser).toHaveBeenCalledWith(9);
    });
  });
});
