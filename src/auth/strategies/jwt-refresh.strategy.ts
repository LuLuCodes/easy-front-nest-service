import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { FastifyRequest } from 'fastify';

import type { AuthConfig } from '@config/auth';
import type { JwtRefreshPayload } from '../types/jwt-payload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly cookieName: string;

  constructor(configService: ConfigService) {
    const auth = configService.get<AuthConfig>('auth');
    if (!auth) {
      throw new Error('Auth config not loaded');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieRefreshTokenExtractor(auth.refreshCookie.name),
        bodyRefreshTokenExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: auth.refreshSecret,
      passReqToCallback: true,
    });
    this.cookieName = auth.refreshCookie.name;
  }

  validate(req: FastifyRequest, payload: JwtRefreshPayload): JwtRefreshPayload & { token: string } {
    const cookies = (req as FastifyRequest & { cookies?: Record<string, string> }).cookies;
    const body = req.body as Record<string, unknown> | undefined;
    const token =
      cookies?.[this.cookieName] ??
      (typeof body?.refreshToken === 'string' ? (body.refreshToken as string) : '');
    return { ...payload, token };
  }
}

function cookieRefreshTokenExtractor(cookieName: string) {
  return (req: FastifyRequest): string | null => {
    const cookies = (req as FastifyRequest & { cookies?: Record<string, string> }).cookies;
    return cookies?.[cookieName] ?? null;
  };
}

function bodyRefreshTokenExtractor(req: FastifyRequest): string | null {
  const body = req.body as Record<string, unknown> | undefined;
  const token = body?.refreshToken;
  return typeof token === 'string' ? token : null;
}
