import * as nock from 'nock';

import { HttpClient, ProviderError } from '@providers/base';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/index';

import { WX_OA_BASE_URL, WxOaClient } from './wx-oa.client';
import type { DecryptedCredential } from '@tenant/credential.service';

function makeClient(
  opts: {
    metadata?: Record<string, unknown>;
    refresh?: () => Promise<string>;
    read?: () => Promise<string | null>;
  } = {},
): WxOaClient {
  const credential: DecryptedCredential = {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.wx_oa,
    app_id: 'wx-app',
    secret: 'app-secret',
    status: CREDENTIAL_STATUS.active,
    metadata: opts.metadata,
  };
  const http = new HttpClient({
    provider: 'wx_oa',
    baseURL: WX_OA_BASE_URL,
    retryBaseDelayMs: 1,
  });
  return new WxOaClient({
    credential,
    http,
    readAccessToken: opts.read ?? (async () => 'cached-token'),
    refreshAccessToken: opts.refresh ?? (async () => 'fresh-token'),
  });
}

describe('WxOaClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns a cached access_token without refreshing', async () => {
    const refresh = jest.fn();
    const client = makeClient({
      read: async () => 'cached-token',
      refresh,
    });
    expect(await client.getAccessToken()).toBe('cached-token');
    expect(refresh).not.toHaveBeenCalled();
  });

  it('falls back to refresh when the cached token is missing', async () => {
    const client = makeClient({
      read: async () => null,
      refresh: async () => 'refreshed',
    });
    expect(await client.getAccessToken()).toBe('refreshed');
  });

  it('lists callback IPs via authed GET', async () => {
    const client = makeClient();
    nock(WX_OA_BASE_URL)
      .get('/cgi-bin/getcallbackip')
      .query({ access_token: 'cached-token' })
      .reply(200, { ip_list: ['1.2.3.4'] });
    expect(await client.getCallbackIp()).toEqual(['1.2.3.4']);
  });

  it('throws ProviderError when WeChat returns a non-zero errcode', async () => {
    const client = makeClient();
    nock(WX_OA_BASE_URL)
      .get('/cgi-bin/getcallbackip')
      .query({ access_token: 'cached-token' })
      .reply(200, { errcode: 40013, errmsg: 'invalid appid' });
    await expect(client.getCallbackIp()).rejects.toMatchObject({
      name: 'ProviderError',
      provider: 'wx_oa',
      upstreamCode: 40013,
    });
  });

  it('signs a JS-SDK config consistently with the WeChat algorithm', async () => {
    const client = makeClient();
    nock(WX_OA_BASE_URL)
      .get('/cgi-bin/ticket/getticket')
      .query({ access_token: 'cached-token', type: 'jsapi' })
      .reply(200, { errcode: 0, errmsg: 'ok', ticket: 'jsticket', expires_in: 7200 });

    const sig = await client.signJsApi('https://example.com/page');
    expect(sig.appId).toBe('wx-app');
    expect(sig.signature).toMatch(/^[0-9a-f]{40}$/);
    expect(typeof sig.timestamp).toBe('number');
    expect(sig.nonceStr).toMatch(/^[0-9a-f]{16}$/);
  });

  it('builds the SNS authorize URL with the documented parameters', () => {
    const client = makeClient();
    const url = client.buildAuthorizeUrl(
      'https://app.example.com/callback',
      'snsapi_userinfo',
      'state-abc',
    );
    expect(url).toContain('appid=wx-app');
    expect(url).toContain('redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback');
    expect(url).toContain('scope=snsapi_userinfo');
    expect(url).toContain('state=state-abc');
    expect(url.endsWith('#wechat_redirect')).toBe(true);
  });

  it('verifyHandshake throws when notify_token is missing from credential metadata', () => {
    const client = makeClient();
    expect(() => client.verifyHandshake('sig', '0', 'n')).toThrow(ProviderError);
  });

  it('verifyHandshake passes a correctly signed handshake', () => {
    const client = makeClient({ metadata: { notify_token: 'tok' } });
    const ts = '1700000000';
    const nonce = 'nonce-1';
    const sorted = ['tok', ts, nonce].sort().join('');
    const sig = require('node:crypto').createHash('sha1').update(sorted).digest('hex');
    expect(client.verifyHandshake(sig, ts, nonce)).toBe(true);
  });
});
