import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  TenantUserRelation,
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      TenantUserRelation,
      User,
      UserLogin,
      UserRight,
      UserRightRelation,
      UserRole,
      UserRoleRelation,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
