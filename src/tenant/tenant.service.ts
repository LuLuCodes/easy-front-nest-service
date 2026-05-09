import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { TENANT_STATUS, TENANT_USER_ROLE, Tenant, TenantUserRelation, User } from '@entities/index';

import { SYSTEM_TENANT_ID } from './constants';
import type { CreateTenantDto, InviteUserDto, UpdateTenantDto } from './dto/tenant.dto';

export interface TenantSummary {
  id: number;
  code: string;
  name: string;
  status: TENANT_STATUS;
  plan?: string;
}

export interface TenantMembership {
  tenant_id: number;
  code: string;
  name: string;
  role_in_tenant: TENANT_USER_ROLE;
  is_default: boolean;
}

@Injectable()
export class TenantService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
    @InjectRepository(TenantUserRelation)
    private readonly relationRepo: Repository<TenantUserRelation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createTenant(dto: CreateTenantDto, actingUserId: number): Promise<Tenant> {
    const exists = await this.tenantRepo.findOne({ where: { code: dto.code } });
    if (exists) {
      throw new ConflictException(`Tenant code "${dto.code}" already exists`);
    }
    return this.dataSource.transaction(async (manager) => {
      const tenant = manager.create(Tenant, {
        code: dto.code,
        name: dto.name,
        status: TENANT_STATUS.active,
        plan: dto.plan ?? 'free',
        metadata: dto.metadata,
        tenant_id: SYSTEM_TENANT_ID,
        created_by: actingUserId,
        updated_by: actingUserId,
      });
      const saved = await manager.save(tenant);

      const relation = manager.create(TenantUserRelation, {
        relation_tenant_id: saved.id!,
        user_id: actingUserId,
        role_in_tenant: TENANT_USER_ROLE.owner,
        is_default: 0,
        tenant_id: saved.id!,
        created_by: actingUserId,
        updated_by: actingUserId,
      });
      await manager.save(relation);

      return saved;
    });
  }

  async updateTenant(id: number, dto: UpdateTenantDto, actingUserId: number): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    if (dto.name !== undefined) tenant.name = dto.name;
    if (dto.status !== undefined) tenant.status = dto.status;
    if (dto.plan !== undefined) tenant.plan = dto.plan;
    if (dto.metadata !== undefined) tenant.metadata = dto.metadata;
    tenant.updated_by = actingUserId;
    return this.tenantRepo.save(tenant);
  }

  async listTenants(): Promise<TenantSummary[]> {
    const tenants = await this.tenantRepo.find({
      select: ['id', 'code', 'name', 'status', 'plan'],
      order: { id: 'ASC' },
    });
    return tenants.map((t) => ({
      id: t.id!,
      code: t.code,
      name: t.name,
      status: t.status,
      plan: t.plan,
    }));
  }

  async findById(id: number): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async listMyTenants(userId: number): Promise<TenantMembership[]> {
    const rows = await this.relationRepo
      .createQueryBuilder('rel')
      .innerJoin(Tenant, 't', 't.id = rel.relation_tenant_id')
      .where('rel.user_id = :userId', { userId })
      .andWhere('t.status = :status', { status: TENANT_STATUS.active })
      .select([
        'rel.relation_tenant_id AS tenant_id',
        't.code AS code',
        't.name AS name',
        'rel.role_in_tenant AS role_in_tenant',
        'rel.is_default AS is_default',
      ])
      .getRawMany<{
        tenant_id: number | string;
        code: string;
        name: string;
        role_in_tenant: TENANT_USER_ROLE;
        is_default: number | string;
      }>();

    return rows.map((r) => ({
      tenant_id: Number(r.tenant_id),
      code: r.code,
      name: r.name,
      role_in_tenant: r.role_in_tenant,
      is_default: Number(r.is_default) === 1,
    }));
  }

  async inviteUser(
    tenantId: number,
    dto: InviteUserDto,
    actingUserId: number,
  ): Promise<TenantUserRelation> {
    const tenant = await this.findById(tenantId);
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new BadRequestException('Invited user does not exist');

    const existing = await this.relationRepo.findOne({
      where: { relation_tenant_id: tenant.id!, user_id: dto.user_id },
    });
    if (existing) {
      throw new ConflictException('User already belongs to this tenant');
    }

    return this.dataSource.transaction(async (manager) => {
      if (dto.is_default) {
        await manager
          .createQueryBuilder()
          .update(TenantUserRelation)
          .set({ is_default: 0, updated_by: actingUserId })
          .where('user_id = :userId', { userId: dto.user_id })
          .execute();
      }
      const rel = manager.create(TenantUserRelation, {
        relation_tenant_id: tenant.id!,
        user_id: dto.user_id,
        role_in_tenant: dto.role_in_tenant,
        is_default: dto.is_default ? 1 : 0,
        tenant_id: tenant.id!,
        created_by: actingUserId,
        updated_by: actingUserId,
      });
      return manager.save(rel);
    });
  }

  async removeUser(tenantId: number, userId: number): Promise<void> {
    const result = await this.relationRepo.delete({
      relation_tenant_id: tenantId,
      user_id: userId,
    });
    if (!result.affected) {
      throw new NotFoundException('Membership not found');
    }
  }

  async resolveMembership(userId: number, tenantId: number): Promise<TenantUserRelation> {
    const rel = await this.relationRepo.findOne({
      where: { relation_tenant_id: tenantId, user_id: userId },
    });
    if (!rel) {
      throw new NotFoundException('User is not a member of this tenant');
    }
    return rel;
  }
}
