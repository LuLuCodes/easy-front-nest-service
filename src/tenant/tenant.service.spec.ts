import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

import { TENANT_STATUS, TENANT_USER_ROLE, Tenant, TenantUserRelation, User } from '@entities/index';

import { TenantService } from './tenant.service';

interface RepoMock {
  find: jest.Mock;
  findOne: jest.Mock;
  delete: jest.Mock;
  save: jest.Mock;
  create: jest.Mock;
  createQueryBuilder: jest.Mock;
}

function makeRepo(): RepoMock {
  return {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue({ affected: 0 }),
    save: jest.fn(async (input) => ({ id: 1, ...input })),
    create: jest.fn((_e, data) => data),
    createQueryBuilder: jest.fn(),
  };
}

describe('TenantService', () => {
  let service: TenantService;
  let tenantRepo: RepoMock;
  let relationRepo: RepoMock;
  let userRepo: RepoMock;
  let dataSource: { transaction: jest.Mock };
  let txManager: { create: jest.Mock; save: jest.Mock; createQueryBuilder: jest.Mock };

  beforeEach(async () => {
    tenantRepo = makeRepo();
    relationRepo = makeRepo();
    userRepo = makeRepo();

    txManager = {
      create: jest.fn((_e, data) => data),
      save: jest.fn(async (entityOrTenant: any) => {
        // when called as save(tenant) (one-arg form used in createTenant)
        if (
          entityOrTenant &&
          typeof entityOrTenant === 'object' &&
          !Array.isArray(entityOrTenant)
        ) {
          return { id: 42, ...entityOrTenant };
        }
        return entityOrTenant;
      }),
      createQueryBuilder: jest.fn(),
    };
    dataSource = {
      transaction: jest.fn(async (cb: any) => cb(txManager)),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TenantService,
        { provide: getDataSourceToken(), useValue: dataSource },
        { provide: getRepositoryToken(Tenant), useValue: tenantRepo },
        { provide: getRepositoryToken(TenantUserRelation), useValue: relationRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = moduleRef.get(TenantService);
  });

  describe('createTenant', () => {
    it('throws Conflict when the code already exists', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1 });
      await expect(
        service.createTenant({ code: 'acme', name: 'A' } as never, 7),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('persists tenant + owner relation in a transaction', async () => {
      tenantRepo.findOne.mockResolvedValue(null);
      const saved = await service.createTenant(
        { code: 'acme', name: 'A', plan: 'pro' } as never,
        7,
      );
      expect(saved).toMatchObject({ id: 42 });
      expect(dataSource.transaction).toHaveBeenCalled();
      // create() called for Tenant + TenantUserRelation
      expect(txManager.create).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateTenant', () => {
    it('rejects when the tenant is missing', async () => {
      tenantRepo.findOne.mockResolvedValue(null);
      await expect(service.updateTenant(1, { name: 'B' } as never, 7)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('patches the provided fields only', async () => {
      const row = {
        id: 1,
        name: 'A',
        plan: 'free',
        status: TENANT_STATUS.active,
        metadata: { x: 1 },
      };
      tenantRepo.findOne.mockResolvedValue(row);
      tenantRepo.save.mockImplementation(async (t) => t);
      const out = await service.updateTenant(
        1,
        { name: 'B', plan: 'pro', metadata: { y: 2 } } as never,
        7,
      );
      expect(out).toMatchObject({
        name: 'B',
        plan: 'pro',
        metadata: { y: 2 },
        updated_by: 7,
      });
    });
  });

  describe('listTenants', () => {
    it('projects rows into TenantSummary shape', async () => {
      tenantRepo.find.mockResolvedValue([
        { id: 1, code: 'a', name: 'A', status: TENANT_STATUS.active, plan: 'free' },
        { id: 2, code: 'b', name: 'B', status: TENANT_STATUS.active, plan: 'pro' },
      ]);
      const out = await service.listTenants();
      expect(out).toHaveLength(2);
      expect(out[0]).toMatchObject({ id: 1, code: 'a' });
    });
  });

  describe('findById', () => {
    it('throws NotFound when missing', async () => {
      tenantRepo.findOne.mockResolvedValue(null);
      await expect(service.findById(99)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns the row when present', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1, code: 'a' });
      await expect(service.findById(1)).resolves.toMatchObject({ id: 1 });
    });
  });

  describe('listMyTenants', () => {
    it('maps raw rows into TenantMembership[]', async () => {
      const qb: Record<string, jest.Mock> = {};
      ['innerJoin', 'where', 'andWhere', 'select'].forEach((m) => {
        qb[m] = jest.fn().mockReturnValue(qb);
      });
      qb.getRawMany = jest.fn().mockResolvedValue([
        {
          tenant_id: '1',
          code: 'a',
          name: 'A',
          role_in_tenant: TENANT_USER_ROLE.owner,
          is_default: '1',
        },
        {
          tenant_id: 2,
          code: 'b',
          name: 'B',
          role_in_tenant: TENANT_USER_ROLE.member,
          is_default: 0,
        },
      ]);
      relationRepo.createQueryBuilder.mockReturnValue(qb);

      const out = await service.listMyTenants(7);
      expect(out).toEqual([
        {
          tenant_id: 1,
          code: 'a',
          name: 'A',
          role_in_tenant: TENANT_USER_ROLE.owner,
          is_default: true,
        },
        {
          tenant_id: 2,
          code: 'b',
          name: 'B',
          role_in_tenant: TENANT_USER_ROLE.member,
          is_default: false,
        },
      ]);
    });
  });

  describe('inviteUser', () => {
    it('rejects when the invited user does not exist', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findOne.mockResolvedValue(null);
      await expect(
        service.inviteUser(1, { user_id: 99, role_in_tenant: TENANT_USER_ROLE.member } as never, 7),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects when the user is already a member', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findOne.mockResolvedValue({ id: 99 });
      relationRepo.findOne.mockResolvedValue({ id: 5 });
      await expect(
        service.inviteUser(1, { user_id: 99, role_in_tenant: TENANT_USER_ROLE.member } as never, 7),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('clears existing defaults when is_default=true and creates a relation', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findOne.mockResolvedValue({ id: 99 });
      relationRepo.findOne.mockResolvedValue(null);

      const updateQb = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(undefined),
      };
      txManager.createQueryBuilder.mockReturnValue(updateQb);

      const out = await service.inviteUser(
        1,
        {
          user_id: 99,
          role_in_tenant: TENANT_USER_ROLE.member,
          is_default: true,
        } as never,
        7,
      );
      expect(updateQb.update).toHaveBeenCalledWith(TenantUserRelation);
      expect(updateQb.set).toHaveBeenCalledWith(expect.objectContaining({ is_default: 0 }));
      expect(out).toMatchObject({ is_default: 1, user_id: 99 });
    });

    it('does not clear defaults when is_default=false', async () => {
      tenantRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findOne.mockResolvedValue({ id: 99 });
      relationRepo.findOne.mockResolvedValue(null);

      await service.inviteUser(
        1,
        {
          user_id: 99,
          role_in_tenant: TENANT_USER_ROLE.member,
          is_default: false,
        } as never,
        7,
      );
      expect(txManager.createQueryBuilder).not.toHaveBeenCalled();
    });
  });

  describe('removeUser', () => {
    it('throws NotFound when no row was deleted', async () => {
      relationRepo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.removeUser(1, 99)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('resolves when one row was removed', async () => {
      relationRepo.delete.mockResolvedValue({ affected: 1 });
      await expect(service.removeUser(1, 99)).resolves.toBeUndefined();
    });
  });

  describe('resolveMembership', () => {
    it('throws NotFound when relation missing', async () => {
      relationRepo.findOne.mockResolvedValue(null);
      await expect(service.resolveMembership(99, 1)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns the relation when present', async () => {
      relationRepo.findOne.mockResolvedValue({ id: 9, relation_tenant_id: 1, user_id: 99 });
      await expect(service.resolveMembership(99, 1)).resolves.toMatchObject({ id: 9 });
    });
  });
});
