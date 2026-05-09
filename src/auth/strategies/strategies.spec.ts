import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

import type { AuthConfig } from '@config/auth';

import { AuthService } from '../auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import type { AuthenticatedUser } from '../types/jwt-payload';

const TEST_AUTH_CONFIG: AuthConfig = {
  accessSecret: 'a'.repeat(40),
  refreshSecret: 'b'.repeat(40),
  accessTtl: '15m',
  refreshTtl: '7d',
  refreshTtlSeconds: 7 * 24 * 3600,
  refreshCookie: {
    name: 'refresh_token',
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/api/auth',
    maxAgeMs: 7 * 24 * 3600 * 1000,
  },
};

function configWith(value: AuthConfig | undefined): ConfigService {
  return {
    get: jest.fn().mockReturnValue(value),
  } as unknown as ConfigService;
}

describe('JwtStrategy', () => {
  it('returns user with id derived from sub on validate', () => {
    const strategy = new JwtStrategy(configWith(TEST_AUTH_CONFIG));
    const result = strategy.validate({
      sub: 42,
      account_id: 'tester',
      roles: ['admin'],
      permissions: ['p1'],
    });
    expect(result).toEqual({
      sub: 42,
      id: 42,
      account_id: 'tester',
      roles: ['admin'],
      permissions: ['p1'],
    });
  });

  it('throws when auth config is missing', () => {
    expect(() => new JwtStrategy(configWith(undefined))).toThrow(/Auth config not loaded/);
  });
});

describe('JwtRefreshStrategy', () => {
  it('extracts refresh token from cookies during validate', () => {
    const strategy = new JwtRefreshStrategy(configWith(TEST_AUTH_CONFIG));
    const req = {
      cookies: { refresh_token: 'cookie-token' },
      body: {},
    } as unknown as Request;
    const out = strategy.validate(req, { sub: 7, account_id: 't', jti: 'j' });
    expect(out.token).toBe('cookie-token');
  });

  it('falls back to body.refreshToken when cookie absent', () => {
    const strategy = new JwtRefreshStrategy(configWith(TEST_AUTH_CONFIG));
    const req = {
      cookies: {},
      body: { refreshToken: 'body-token' },
    } as unknown as Request;
    const out = strategy.validate(req, { sub: 7, account_id: 't', jti: 'j' });
    expect(out.token).toBe('body-token');
  });
});

describe('LocalStrategy', () => {
  it('rejects when login_client is missing or non-numeric', async () => {
    const authService = { validateUser: jest.fn() } as unknown as AuthService;
    const strategy = new LocalStrategy(authService);
    const req = { body: {} } as unknown as Request;
    await expect(strategy.validate(req, 'a', 'p')).rejects.toThrow(UnauthorizedException);
    expect(authService.validateUser).not.toHaveBeenCalled();
  });

  it('rejects when AuthService returns null', async () => {
    const authService = {
      validateUser: jest.fn().mockResolvedValue(null),
    } as unknown as AuthService;
    const strategy = new LocalStrategy(authService);
    const req = { body: { login_client: 1 } } as unknown as Request;
    await expect(strategy.validate(req, 'a', 'p')).rejects.toThrow(UnauthorizedException);
  });

  it('returns the validated user on success', async () => {
    const user: AuthenticatedUser = {
      id: 1,
      sub: 1,
      account_id: 'a',
      roles: [],
      permissions: [],
    };
    const authService = {
      validateUser: jest.fn().mockResolvedValue(user),
    } as unknown as AuthService;
    const strategy = new LocalStrategy(authService);
    const req = { body: { login_client: 1 } } as unknown as Request;
    await expect(strategy.validate(req, 'a', 'p')).resolves.toEqual(user);
    expect(authService.validateUser).toHaveBeenCalledWith('a', 'p', 1);
  });
});
