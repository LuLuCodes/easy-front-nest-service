import { randomBytes } from 'node:crypto';

import app_config from './app';
import mq_config from './mq';
import mysql_config from './mysql';
import redis_config from './redis';
import tenant_config from './tenant';
import while_list_config from './white-list';

function callConfig<T>(cfg: { KEY?: string } & ((...args: unknown[]) => T)): T {
  // registerAs returns a ConfigFactory with a KEY symbol; calling it returns
  // the resolved config object.
  return (cfg as unknown as () => T)();
}

describe('config factories', () => {
  it('app: ships defaults when env vars are absent', () => {
    const c = callConfig(app_config) as Record<string, unknown>;
    expect(c.name).toBe('easy-front-nest-service');
    expect(c.port).toBe(8000);
  });

  it('mq: returns the shape with host/user/password keys', () => {
    const c = callConfig(mq_config) as Record<string, unknown>;
    expect(c).toHaveProperty('host');
    expect(c).toHaveProperty('user');
    expect(c).toHaveProperty('password');
  });

  it('mysql: returns the configured shape', () => {
    const c = callConfig(mysql_config) as Record<string, unknown>;
    expect(c).toBeDefined();
  });

  it('redis: returns localhost+6379 by default', () => {
    const c = callConfig(redis_config) as Record<string, unknown>;
    expect(c.host).toBe('127.0.0.1');
    expect(c.port).toBe(6379);
  });

  describe('tenant', () => {
    afterEach(() => {
      delete process.env.TENANT_MASTER_KEY;
      delete process.env.TENANT_MASTER_KEY_VERSION;
    });

    it('produces a 32-byte master key when env value is supplied', () => {
      process.env.TENANT_MASTER_KEY = randomBytes(32).toString('base64');
      const c = callConfig(tenant_config) as { masterKey: Buffer; masterKeyVersion: number };
      expect(Buffer.isBuffer(c.masterKey)).toBe(true);
      expect(c.masterKey.length).toBe(32);
      expect(c.masterKeyVersion).toBe(1);
    });

    it('falls back to a dev key when env is missing (non-production)', () => {
      process.env.NODE_ENV = 'development';
      delete process.env.TENANT_MASTER_KEY;
      const c = callConfig(tenant_config) as { masterKey: Buffer };
      expect(c.masterKey.length).toBe(32);
    });
  });

  it('while_list: ships the legacy sign whitelist', () => {
    const c = callConfig(while_list_config) as { sign: string[] };
    expect(c.sign).toContain('/api/oss/upload-oss');
  });
});
