import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import auth_config from '@config/auth';
import { OpLogService } from '@modules/oplog/oplog.service';
import { TenantService } from '@tenant/tenant.service';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthModule wiring', () => {
  it('compiles with all strategies and AuthService resolvable', async () => {
    @Global()
    @Module({
      providers: [
        { provide: OpLogService, useValue: { createLogTask: jest.fn() } },
        {
          provide: TenantService,
          useValue: {
            resolveMembership: jest.fn(),
            listMyTenants: jest.fn(),
          },
        },
      ],
      exports: [OpLogService, TenantService],
    })
    class StubGlobalDeps {}

    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [auth_config], isGlobal: true }),
        StubGlobalDeps,
        AuthModule,
      ],
    })
      .overrideProvider(getRepositoryToken(UserLogin))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .overrideProvider(getRepositoryToken(User))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .overrideProvider(getRepositoryToken(UserRoleRelation))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .overrideProvider(getRepositoryToken(UserRole))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .overrideProvider(getRepositoryToken(UserRightRelation))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .overrideProvider(getRepositoryToken(UserRight))
      .useValue({ findOne: jest.fn(), find: jest.fn() })
      .compile();

    expect(moduleRef.get(AuthService)).toBeInstanceOf(AuthService);
    expect(moduleRef.get(JwtStrategy)).toBeInstanceOf(JwtStrategy);
    expect(moduleRef.get(JwtRefreshStrategy)).toBeInstanceOf(JwtRefreshStrategy);
    expect(moduleRef.get(LocalStrategy)).toBeInstanceOf(LocalStrategy);

    await moduleRef.close();
  });
});
