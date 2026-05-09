import { env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

import { loadMasterKey } from '@tenant/crypto/aes-gcm';

export interface TenantConfig {
  masterKey: Buffer;
  masterKeyVersion: number;
}

const DEV_FALLBACK_KEY_BASE64 = Buffer.alloc(32, 'p').toString('base64');

export default registerAs('tenant', (): TenantConfig => {
  const raw = env('TENANT_MASTER_KEY', '');
  let masterKey: Buffer;

  if (raw) {
    try {
      masterKey = loadMasterKey(raw);
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        throw err;
      }
      masterKey = loadMasterKey(DEV_FALLBACK_KEY_BASE64);
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('TENANT_MASTER_KEY must be set in production');
    }
    masterKey = loadMasterKey(DEV_FALLBACK_KEY_BASE64);
  }

  return {
    masterKey,
    masterKeyVersion: Number(env('TENANT_MASTER_KEY_VERSION', '1')),
  };
});
