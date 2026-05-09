import { randomUUID } from 'node:crypto';
import { Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ProviderError } from './provider-error';

export interface HttpClientOptions {
  provider: string;
  baseURL?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryBaseDelayMs?: number;
  /**
   * Treat any response (including 4xx) returning truthy here as a transient
   * failure that should be retried. Default: only network errors + 5xx.
   */
  isRetryable?: (err: AxiosError) => boolean;
  /** Optional default headers, e.g. signing fields injected by sub-class. */
  defaultHeaders?: Record<string, string>;
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_BASE_MS = 200;

/**
 * Small wrapper around axios that gives every provider:
 *   - per-request timeout
 *   - exponential backoff retry on transient network / 5xx errors
 *   - x-request-id propagation for tracing
 *   - normalized ProviderError when a request fails terminally
 *
 * Providers should construct one HttpClient per `(tenant_id, app_id)` and
 * reuse it for all calls so axios keepalive applies. Stateless across
 * requests; retry counter is per-call.
 */
export class HttpClient {
  private readonly axios: AxiosInstance;
  private readonly logger: Logger;
  private readonly maxRetries: number;
  private readonly retryBaseDelayMs: number;
  private readonly isRetryable: (err: AxiosError) => boolean;
  readonly provider: string;

  constructor(opts: HttpClientOptions) {
    this.provider = opts.provider;
    this.maxRetries = opts.maxRetries ?? DEFAULT_RETRIES;
    this.retryBaseDelayMs = opts.retryBaseDelayMs ?? DEFAULT_RETRY_BASE_MS;
    this.isRetryable = opts.isRetryable ?? defaultIsRetryable;
    this.logger = new Logger(`HttpClient:${opts.provider}`);
    this.axios = axios.create({
      baseURL: opts.baseURL,
      timeout: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
      headers: opts.defaultHeaders,
      validateStatus: () => true,
    });
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const traceId = (config.headers?.['x-request-id'] as string) ?? randomUUID();
    const headers = { ...(config.headers as Record<string, string>), 'x-request-id': traceId };
    let attempt = 0;
    let lastError: AxiosError | undefined;

    while (attempt <= this.maxRetries) {
      try {
        const res = await this.axios.request<T>({ ...config, headers });
        if (res.status >= 500) {
          const synthetic = new AxiosError(`Upstream ${res.status}`, String(res.status));
          synthetic.response = res;
          if (attempt < this.maxRetries && this.isRetryable(synthetic)) {
            await this.backoff(attempt, traceId);
            attempt++;
            continue;
          }
          throw this.toProviderError(synthetic);
        }
        return res;
      } catch (err) {
        if (err instanceof ProviderError) throw err;
        const axErr = err as AxiosError;
        lastError = axErr;
        if (attempt < this.maxRetries && this.isRetryable(axErr)) {
          await this.backoff(attempt, traceId);
          attempt++;
          continue;
        }
        throw this.toProviderError(axErr);
      }
    }
    /* istanbul ignore next: loop above always returns or throws */
    throw this.toProviderError(lastError ?? new AxiosError('Unknown HTTP failure'));
  }

  private async backoff(attempt: number, traceId: string): Promise<void> {
    const delay = this.retryBaseDelayMs * Math.pow(2, attempt);
    this.logger.debug(`Retrying after ${delay}ms (attempt ${attempt + 1}, trace ${traceId})`);
    await new Promise((r) => setTimeout(r, delay));
  }

  private toProviderError(err: AxiosError): ProviderError {
    const status = err.response?.status;
    return new ProviderError({
      provider: this.provider,
      message: err.message,
      statusCode: status,
      retryable: this.isRetryable(err),
      cause: err,
    });
  }
}

function defaultIsRetryable(err: AxiosError): boolean {
  if (!err.response) return true;
  return err.response.status >= 500 && err.response.status < 600;
}
