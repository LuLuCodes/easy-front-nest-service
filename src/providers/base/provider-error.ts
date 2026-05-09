/**
 * Common base for errors thrown by SDK providers (wx-oa, wx-mp, wx-pay,
 * alipay, oss). Subclasses tag the provider name + an upstream code so
 * controllers can format consistent client responses without provider-
 * specific knowledge.
 */
export class ProviderError extends Error {
  readonly provider: string;
  readonly upstreamCode?: string | number;
  readonly statusCode?: number;
  readonly retryable: boolean;
  readonly cause?: unknown;

  constructor(opts: {
    provider: string;
    message: string;
    upstreamCode?: string | number;
    statusCode?: number;
    retryable?: boolean;
    cause?: unknown;
  }) {
    super(opts.message);
    this.name = 'ProviderError';
    this.provider = opts.provider;
    this.upstreamCode = opts.upstreamCode;
    this.statusCode = opts.statusCode;
    this.retryable = opts.retryable ?? false;
    this.cause = opts.cause;
  }
}

export class CredentialMissingError extends ProviderError {
  constructor(provider: string, tenantId: number) {
    super({
      provider,
      message: `No active ${provider} credential configured for tenant ${tenantId}`,
      retryable: false,
    });
    this.name = 'CredentialMissingError';
  }
}
