import * as nock from 'nock';

import { HttpClient } from './http-client';
import { ProviderError } from './provider-error';

const BASE = 'https://provider.example.com';

describe('HttpClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns a successful 2xx response', async () => {
    const client = new HttpClient({ provider: 'demo', baseURL: BASE });
    nock(BASE).get('/ok').reply(200, { value: 1 });
    const res = await client.request<{ value: number }>({ method: 'GET', url: '/ok' });
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ value: 1 });
  });

  it('retries 5xx responses up to maxRetries times then throws ProviderError', async () => {
    const client = new HttpClient({
      provider: 'demo',
      baseURL: BASE,
      maxRetries: 2,
      retryBaseDelayMs: 1,
    });
    nock(BASE).get('/flaky').times(3).reply(503, { error: 'busy' });

    await expect(client.request({ method: 'GET', url: '/flaky' })).rejects.toThrow(ProviderError);
  });

  it('eventually succeeds when a 5xx is followed by 200', async () => {
    const client = new HttpClient({
      provider: 'demo',
      baseURL: BASE,
      retryBaseDelayMs: 1,
    });
    const scope = nock(BASE);
    scope.get('/wobble').reply(500, {});
    scope.get('/wobble').reply(200, { value: 'ok' });
    const res = await client.request<{ value: string }>({ method: 'GET', url: '/wobble' });
    expect(res.data.value).toBe('ok');
  });

  it('does not retry 4xx responses (treated as terminal client errors)', async () => {
    const client = new HttpClient({
      provider: 'demo',
      baseURL: BASE,
      retryBaseDelayMs: 1,
    });
    nock(BASE).get('/forbidden').reply(403, { error: 'no' });
    const res = await client.request({ method: 'GET', url: '/forbidden' });
    expect(res.status).toBe(403);
  });

  it('attaches an x-request-id header to outgoing requests', async () => {
    const client = new HttpClient({ provider: 'demo', baseURL: BASE });
    let observedHeader: string | undefined;
    nock(BASE)
      .get('/echo')
      .reply(function () {
        observedHeader = this.req.headers['x-request-id'] as string;
        return [200, {}];
      });
    await client.request({ method: 'GET', url: '/echo' });
    expect(observedHeader).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('honors a caller-supplied x-request-id', async () => {
    const client = new HttpClient({ provider: 'demo', baseURL: BASE });
    let observedHeader: string | undefined;
    nock(BASE)
      .get('/echo')
      .reply(function () {
        observedHeader = this.req.headers['x-request-id'] as string;
        return [200, {}];
      });
    await client.request({
      method: 'GET',
      url: '/echo',
      headers: { 'x-request-id': 'caller-trace' },
    });
    expect(observedHeader).toBe('caller-trace');
  });
});
