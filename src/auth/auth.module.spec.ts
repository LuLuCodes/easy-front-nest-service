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

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthModule wiring', () => {
  it('compiles with all strategies and AuthService resolvable', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [auth_config], isGlobal: true }), AuthModule],
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
