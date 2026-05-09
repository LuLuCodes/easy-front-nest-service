import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { Request } from 'express';

import { AuthService } from '../auth.service';
import type { AuthenticatedUser } from '../types/jwt-payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account_id',
      passwordField: 'account_pwd',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, accountId: string, password: string): Promise<AuthenticatedUser> {
    const loginClient = (req.body as Record<string, unknown>)?.login_client;
    if (typeof loginClient !== 'number') {
      throw new UnauthorizedException('login_client is required');
    }
    const user = await this.authService.validateUser(accountId, password, loginClient);
    if (!user) {
      throw new UnauthorizedException('账号或密码错误');
    }
    return user;
  }
}
