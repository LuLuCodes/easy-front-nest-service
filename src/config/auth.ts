import { env, envBoolean, envNumber } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

const MIN_SECRET_LENGTH = 32;
const DEV_FALLBACK_PREFIX = 'dev-only-secret-do-not-use-in-prod-';

function readSecret(key: string): string {
  const value = env(key, '');
  if (value && value.length >= MIN_SECRET_LENGTH) {
    return value;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      `Auth config: ${key} must be set and at least ${MIN_SECRET_LENGTH} characters in production`,
    );
  }
  return `${DEV_FALLBACK_PREFIX}${key.toLowerCase()}`.padEnd(MIN_SECRET_LENGTH, '0');
}

export interface AuthConfig {
  accessSecret: string;
  refreshSecret: string;
  accessTtl: string;
  refreshTtl: string;
  refreshTtlSeconds: number;
  refreshCookie: {
    name: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    path: string;
    maxAgeMs: number;
  };
}

export default registerAs('auth', (): AuthConfig => {
  const refreshTtlSeconds = envNumber('JWT_REFRESH_TTL_SECONDS', 7 * 24 * 3600);

  return {
    accessSecret: readSecret('JWT_ACCESS_SECRET'),
    refreshSecret: readSecret('JWT_REFRESH_SECRET'),
    accessTtl: env('JWT_ACCESS_TTL', '15m'),
    refreshTtl: env('JWT_REFRESH_TTL', '7d'),
    refreshTtlSeconds,
    refreshCookie: {
      name: env('REFRESH_COOKIE_NAME', 'refresh_token'),
      httpOnly: true,
      secure: envBoolean('REFRESH_COOKIE_SECURE', true),
      sameSite: env('REFRESH_COOKIE_SAMESITE', 'lax') as 'lax' | 'strict' | 'none',
      path: env('REFRESH_COOKIE_PATH', '/api/auth'),
      maxAgeMs: refreshTtlSeconds * 1000,
    },
  };
});
