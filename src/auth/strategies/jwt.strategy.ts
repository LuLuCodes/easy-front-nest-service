import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { AuthConfig } from '@config/auth';
import type { AuthenticatedUser, JwtAccessPayload } from '../types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const auth = configService.get<AuthConfig>('auth');
    if (!auth) {
      throw new Error('Auth config not loaded');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: auth.accessSecret,
    });
  }

  validate(payload: JwtAccessPayload): AuthenticatedUser {
    return {
      ...payload,
      id: payload.sub,
    };
  }
}
