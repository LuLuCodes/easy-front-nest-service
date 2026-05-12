import { randomUUID } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import type { AuthConfig } from '@config/auth';
import { encryptPassword } from '@libs/cryptogram';
import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { LOGIN_TYPE, USER_STATUS } from '@dto/EnumDTO';
import { SYSTEM_TENANT_ID } from '@tenant/constants';
import { TenantService } from '@tenant/tenant.service';
import { TenantUserRelation } from '@entities/index';

import type {
  AuthenticatedUser,
  AuthorityBundle,
  JwtAccessPayload,
  JwtRefreshPayload,
} from './types/jwt-payload';

export interface SignedTokens {
  accessToken: string;
  refreshToken: string;
  refreshExpiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tenantService: TenantService,
    @InjectRepository(UserLogin)
    private readonly userLoginRepo: Repository<UserLogin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRoleRelation)
    private readonly userRoleRelationRepo: Repository<UserRoleRelation>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
    @InjectRepository(UserRightRelation)
    private readonly userRightRelationRepo: Repository<UserRightRelation>,
    @InjectRepository(UserRight)
    private readonly userRightRepo: Repository<UserRight>,
    @InjectRepository(TenantUserRelation)
    private readonly tenantRelationRepo: Repository<TenantUserRelation>,
  ) {}

  async switchTenant(userId: number, tenantId: number): Promise<SignedTokens> {
    const user = await this.userRepo.findOne({
      select: ['id', 'role_type', 'user_status', 'is_system_admin'],
      where: { id: userId },
    });
    if (!user || user.user_status !== USER_STATUS.正常) {
      throw new UnauthorizedException('用户状态异常');
    }
    const isSwitchToSystem = tenantId === SYSTEM_TENANT_ID;
    if (isSwitchToSystem) {
      if (user.is_system_admin !== 1) {
        throw new UnauthorizedException('仅 system 超级管理员可切换到 system 租户');
      }
    } else {
      await this.tenantService.resolveMembership(userId, tenantId);
    }
    const login = await this.userLoginRepo.findOne({
      select: ['account_id', 'login_client'],
      where: { user_id: userId },
    });
    if (!login) {
      throw new UnauthorizedException('账号不存在');
    }
    const authorities = isSwitchToSystem
      ? { roles: [], permissions: [] }
      : await this.loadAuthorities(user.id!, tenantId);
    return this.signTokens({
      id: user.id!,
      sub: user.id!,
      account_id: login.account_id!,
      tenant_id: tenantId,
      is_super_admin: isSwitchToSystem,
      login_client: login.login_client,
      role_type: user.role_type,
      roles: authorities.roles,
      permissions: authorities.permissions,
    });
  }

  async validateUser(
    accountId: string,
    password: string,
    loginClient: number,
  ): Promise<AuthenticatedUser | null> {
    const login = await this.userLoginRepo.findOne({
      select: ['id', 'account_id', 'account_pwd', 'pwd_salt', 'user_id', 'login_client'],
      where: {
        account_id: accountId,
        login_client: loginClient,
        login_type: LOGIN_TYPE.账号名密码登录,
      },
    });
    if (!login) return null;

    const hashed = encryptPassword(password, login.pwd_salt!);
    if (hashed !== login.account_pwd) return null;

    const user = await this.userRepo.findOne({
      select: ['id', 'nick', 'role_type', 'user_status', 'is_system_admin'],
      where: { id: login.user_id },
    });
    if (!user || user.user_status !== USER_STATUS.正常) return null;

    const isSystemAdmin = user.is_system_admin === 1;
    if (isSystemAdmin) {
      return {
        id: user.id!,
        sub: user.id!,
        account_id: login.account_id!,
        tenant_id: SYSTEM_TENANT_ID,
        is_super_admin: true,
        login_client: login.login_client,
        role_type: user.role_type,
        roles: [],
        permissions: [],
      };
    }

    const defaultTenantId = await this.resolveDefaultTenant(user.id!);
    if (defaultTenantId === null) {
      return null;
    }
    const authorities = await this.loadAuthorities(user.id!, defaultTenantId);
    return {
      id: user.id!,
      sub: user.id!,
      account_id: login.account_id!,
      tenant_id: defaultTenantId,
      is_super_admin: false,
      login_client: login.login_client,
      role_type: user.role_type,
      roles: authorities.roles,
      permissions: authorities.permissions,
    };
  }

  private async resolveDefaultTenant(userId: number): Promise<number | null> {
    const memberships = await this.tenantRelationRepo.find({
      select: ['relation_tenant_id', 'is_default'],
      where: { user_id: userId },
      order: { is_default: 'DESC', id: 'ASC' },
    });
    if (memberships.length === 0) return null;
    return memberships[0].relation_tenant_id;
  }

  async signTokens(user: AuthenticatedUser): Promise<SignedTokens> {
    const auth = this.requireAuthConfig();

    const accessPayload: JwtAccessPayload = {
      sub: user.id,
      account_id: user.account_id,
      tenant_id: user.tenant_id,
      is_super_admin: user.is_super_admin,
      login_client: user.login_client,
      role_type: user.role_type,
      roles: user.roles,
      permissions: user.permissions,
    };
    const refreshPayload: JwtRefreshPayload = {
      sub: user.id,
      account_id: user.account_id,
      tenant_id: user.tenant_id,
      jti: randomUUID(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: auth.accessSecret,
        expiresIn: auth.accessTtl as unknown as number,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: auth.refreshSecret,
        expiresIn: auth.refreshTtl as unknown as number,
      }),
    ]);

    return { accessToken, refreshToken, refreshExpiresIn: auth.refreshTtlSeconds };
  }

  async refresh(payload: JwtRefreshPayload): Promise<SignedTokens> {
    const user = await this.userRepo.findOne({
      select: ['id', 'role_type', 'user_status', 'is_system_admin'],
      where: { id: payload.sub },
    });
    if (!user || user.user_status !== USER_STATUS.正常) {
      throw new UnauthorizedException('用户状态异常');
    }
    const isSystemMode = payload.tenant_id === SYSTEM_TENANT_ID;
    if (isSystemMode && user.is_system_admin !== 1) {
      throw new UnauthorizedException('用户已失去 system 权限');
    }
    const authorities = isSystemMode
      ? { roles: [], permissions: [] }
      : await this.loadAuthorities(user.id!, payload.tenant_id);

    return this.signTokens({
      id: user.id!,
      sub: user.id!,
      account_id: payload.account_id,
      tenant_id: payload.tenant_id,
      is_super_admin: isSystemMode,
      role_type: user.role_type,
      roles: authorities.roles,
      permissions: authorities.permissions,
    });
  }

  async loadAuthorities(userId: number, tenantId: number): Promise<AuthorityBundle> {
    const relations = await this.userRoleRelationRepo.find({
      select: { role_id: true },
      where: { user_id: userId, tenant_id: tenantId },
    });
    const roleIds = relations
      .map((r) => r.role_id)
      .filter((id): id is number => typeof id === 'number');
    if (roleIds.length === 0) {
      return { roles: [], permissions: [] };
    }

    const roles = await this.userRoleRepo.find({
      select: ['id', 'role_name', 'is_supper'],
      where: { id: In(roleIds), tenant_id: tenantId },
    });

    const isSupper = roles.some((r) => r.is_supper === 1);

    let rightCodes: string[] = [];
    if (isSupper) {
      const allRights = await this.userRightRepo.find({
        select: ['right_code'],
        where: { tenant_id: tenantId },
      });
      rightCodes = allRights.map((r) => r.right_code).filter(Boolean);
    } else {
      const rels = await this.userRightRelationRepo.find({
        select: { right_id: true },
        where: { role_id: In(roleIds), tenant_id: tenantId },
      });
      const rightIds = rels
        .map((r) => r.right_id)
        .filter((id): id is number => typeof id === 'number');
      if (rightIds.length > 0) {
        const rights = await this.userRightRepo.find({
          select: ['right_code'],
          where: { id: In(rightIds), tenant_id: tenantId },
        });
        rightCodes = rights.map((r) => r.right_code).filter(Boolean);
      }
    }

    return {
      roles: Array.from(new Set(roles.map((r) => r.role_name).filter(Boolean))),
      permissions: Array.from(new Set(rightCodes)),
    };
  }

  private requireAuthConfig(): AuthConfig {
    const auth = this.configService.get<AuthConfig>('auth');
    if (!auth) {
      throw new Error('Auth config not loaded');
    }
    return auth;
  }
}
