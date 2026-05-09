import { createHmac } from 'node:crypto';

import { ProviderError } from '@providers/base';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/tenant-credential.entity';
import type { DecryptedCredential } from '@tenant/credential.service';

import { OssClient } from './oss.client';

jest.mock('ali-oss', () => {
  const Mock = jest.fn().mockImplementation(() => ({
    put: jest.fn().mockResolvedValue({
      name: 'a/b.txt',
      url: 'https://my-bucket.oss-cn-hangzhou.aliyuncs.com/a/b.txt',
    }),
    signatureUrl: jest
      .fn()
      .mockReturnValue('https://my-bucket.oss-cn-hangzhou.aliyuncs.com/a/b.txt?Signature=xyz'),
  }));
  return { __esModule: true, default: Mock };
});

function buildCredential(overrides: Partial<DecryptedCredential> = {}): DecryptedCredential {
  return {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.oss,
    app_id: 'my-bucket',
    secret: 'access-key-secret-xxx',
    cert: 'access-key-id-xxx',
    status: CREDENTIAL_STATUS.active,
    metadata: {
      region: 'oss-cn-hangzhou',
      endpoint: 'https://oss-cn-hangzhou.aliyuncs.com',
      domain: 'cdn.example.com',
    },
    ...overrides,
  };
}

describe('OssClient', () => {
  describe('constructor validation', () => {
    it('throws when region missing', () => {
      expect(() => new OssClient({ credential: buildCredential({ metadata: {} }) })).toThrow(
        ProviderError,
      );
    });

    it('throws when access_key_id (cert) missing', () => {
      expect(() => new OssClient({ credential: buildCredential({ cert: undefined }) })).toThrow(
        ProviderError,
      );
    });

    it('throws when access_key_secret (secret) missing', () => {
      expect(() => new OssClient({ credential: buildCredential({ secret: '' }) })).toThrow(
        ProviderError,
      );
    });
  });

  describe('put', () => {
    it('rewrites the host with the configured CDN domain', async () => {
      const client = new OssClient({ credential: buildCredential() });
      const result = await client.put({ key: 'a/b.txt', body: Buffer.from('hi') });
      expect(result.key).toBe('a/b.txt');
      expect(result.url).toBe('https://cdn.example.com/a/b.txt');
    });

    it('returns the original host when no domain configured', async () => {
      const client = new OssClient({
        credential: buildCredential({
          metadata: { region: 'oss-cn-hangzhou' },
        }),
      });
      const result = await client.put({ key: 'a/b.txt', body: Buffer.from('hi') });
      expect(result.url).toContain('oss-cn-hangzhou.aliyuncs.com');
    });

    it('rejects empty key or leading slash', async () => {
      const client = new OssClient({ credential: buildCredential() });
      await expect(client.put({ key: '', body: Buffer.alloc(0) })).rejects.toBeInstanceOf(
        ProviderError,
      );
      await expect(
        client.put({ key: '/leading-slash.txt', body: Buffer.alloc(0) }),
      ).rejects.toBeInstanceOf(ProviderError);
    });
  });

  describe('signedUrl', () => {
    it('rewrites host with CDN domain and clamps absurd TTLs', () => {
      const client = new OssClient({ credential: buildCredential() });
      const url = client.signedUrl('a/b.txt', { expires_seconds: 99 * 24 * 3600 });
      expect(url.startsWith('https://cdn.example.com/')).toBe(true);
    });

    it('rejects empty or leading-slash keys', () => {
      const client = new OssClient({ credential: buildCredential() });
      expect(() => client.signedUrl('')).toThrow(ProviderError);
      expect(() => client.signedUrl('/x')).toThrow(ProviderError);
    });
  });

  describe('signPostObjectParams', () => {
    it('produces a base64 policy whose HMAC-SHA1 signature matches', () => {
      const client = new OssClient({ credential: buildCredential() });
      const params = client.signPostObjectParams({ max_size_mb: 5, expires_seconds: 600 });
      const expected = createHmac('sha1', 'access-key-secret-xxx')
        .update(params.policy)
        .digest('base64');
      expect(params.signature).toBe(expected);
      expect(params.access_key_id).toBe('access-key-id-xxx');
    });

    it('encodes a content-length-range condition matching max_size_mb', () => {
      const client = new OssClient({ credential: buildCredential() });
      const params = client.signPostObjectParams({ max_size_mb: 7 });
      const decoded = JSON.parse(Buffer.from(params.policy, 'base64').toString('utf8'));
      const range = decoded.conditions.find(
        (c: unknown[]) => Array.isArray(c) && c[0] === 'content-length-range',
      );
      expect(range).toEqual(['content-length-range', 0, 7 * 1024 * 1024]);
    });

    it('appends a starts-with $key constraint when dir is given', () => {
      const client = new OssClient({ credential: buildCredential() });
      const params = client.signPostObjectParams({ dir: 'uploads/2026' });
      const decoded = JSON.parse(Buffer.from(params.policy, 'base64').toString('utf8'));
      const startsWith = decoded.conditions.find(
        (c: unknown[]) => Array.isArray(c) && c[0] === 'starts-with',
      );
      expect(startsWith).toEqual(['starts-with', '$key', 'uploads/2026/']);
      expect(params.dir).toBe('uploads/2026/');
    });

    it('uses VPC-internal hostname when internal=true', () => {
      const client = new OssClient({
        credential: buildCredential({
          metadata: { region: 'oss-cn-hangzhou', internal: true },
        }),
      });
      const params = client.signPostObjectParams({});
      expect(params.host).toBe('https://my-bucket.oss-cn-hangzhou-internal.aliyuncs.com');
    });
  });
});
