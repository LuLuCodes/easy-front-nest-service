import { createCipheriv, randomBytes } from 'node:crypto';
import * as nock from 'nock';

import { HttpClient, ProviderError } from '@providers/base';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/index';

import { WX_MP_BASE_URL, WxMpClient } from './wx-mp.client';
import type { DecryptedCredential } from '@tenant/credential.service';

function makeClient(read: () => Promise<string | null> = async () => 'cached'): WxMpClient {
  const credential: DecryptedCredential = {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.wx_mp,
    app_id: 'mp-app',
    secret: 'mp-secret',
    status: CREDENTIAL_STATUS.active,
  };
  const http = new HttpClient({
    provider: 'wx_mp',
    baseURL: WX_MP_BASE_URL,
    retryBaseDelayMs: 1,
  });
  return new WxMpClient({
    credential,
    http,
    readAccessToken: read,
    refreshAccessToken: async () => 'fresh',
  });
}

describe('WxMpClient', () => {
  afterEach(() => nock.cleanAll());

  it('exchanges js_code for openid + session_key', async () => {
    const client = makeClient();
    nock(WX_MP_BASE_URL)
      .get('/sns/jscode2session')
      .query({
        appid: 'mp-app',
        secret: 'mp-secret',
        js_code: 'JS_CODE',
        grant_type: 'authorization_code',
      })
      .reply(200, {
        openid: 'OPENID-1',
        session_key: 'SK',
        unionid: 'UNI',
      });

    const out = await client.code2Session('JS_CODE');
    expect(out).toEqual({ openid: 'OPENID-1', session_key: 'SK', unionid: 'UNI' });
  });

  it('throws ProviderError on a non-zero errcode from code2Session', async () => {
    const client = makeClient();
    nock(WX_MP_BASE_URL)
      .get('/sns/jscode2session')
      .query(true)
      .reply(200, { errcode: 40029, errmsg: 'invalid code' });

    await expect(client.code2Session('bad')).rejects.toMatchObject({
      provider: 'wx_mp',
      upstreamCode: 40029,
    });
  });

  it('returns binary payload from getUnlimitedQrCode and asserts the token in query', async () => {
    const client = makeClient();
    nock(WX_MP_BASE_URL)
      .post('/wxa/getwxacodeunlimit', (body) => body.scene === 'foo')
      .query({ access_token: 'cached' })
      .reply(200, Buffer.from([0x89, 0x50, 0x4e, 0x47]), { 'content-type': 'image/png' });

    const buf = await client.getUnlimitedQrCode({ scene: 'foo' });
    expect(buf.subarray(0, 4)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  });

  it('surfaces JSON errors from QR-code endpoints (binary fallthrough)', async () => {
    const client = makeClient();
    nock(WX_MP_BASE_URL)
      .post('/wxa/getwxacodeunlimit')
      .query({ access_token: 'cached' })
      .reply(200, JSON.stringify({ errcode: 41030, errmsg: 'page invalid' }), {
        'content-type': 'application/json',
      });

    await expect(client.getUnlimitedQrCode({ scene: 's' })).rejects.toMatchObject({
      provider: 'wx_mp',
      upstreamCode: 41030,
    });
  });

  it('decryptUserData round-trips a watermarked payload', () => {
    const client = makeClient();
    const sessionKey = randomBytes(16);
    const iv = randomBytes(16);
    const plain = JSON.stringify({
      nickName: 'tester',
      watermark: { appid: 'mp-app', timestamp: 1700000000 },
    });
    const cipher = createCipheriv('aes-128-cbc', sessionKey, iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);

    const decoded = client.decryptUserData<{ nickName: string }>(
      sessionKey.toString('base64'),
      encrypted.toString('base64'),
      iv.toString('base64'),
    );
    expect(decoded.nickName).toBe('tester');
  });

  it('rejects payloads whose watermark.appid does not match', () => {
    const client = makeClient();
    const sessionKey = randomBytes(16);
    const iv = randomBytes(16);
    const plain = JSON.stringify({ watermark: { appid: 'other-app' } });
    const cipher = createCipheriv('aes-128-cbc', sessionKey, iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);

    expect(() =>
      client.decryptUserData(
        sessionKey.toString('base64'),
        encrypted.toString('base64'),
        iv.toString('base64'),
      ),
    ).toThrow(ProviderError);
  });

  it('rejects malformed session_key / iv lengths', () => {
    const client = makeClient();
    expect(() =>
      client.decryptUserData(
        Buffer.alloc(8).toString('base64'),
        Buffer.alloc(16).toString('base64'),
        Buffer.alloc(16).toString('base64'),
      ),
    ).toThrow(/length/);
  });
});
