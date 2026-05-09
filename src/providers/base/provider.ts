import type { CREDENTIAL_PROVIDER } from '@entities/index';

/**
 * Common shape for all SDK providers (wx-oa, wx-mp, wx-pay, alipay, oss).
 * Each provider is responsible for fetching its tenant credential, caching
 * a long-lived client per `(tenant_id, app_id)` pair, and exposing a
 * domain-specific surface (which is provider-specific and thus not part
 * of this interface).
 */
export interface Provider<TClient> {
  readonly name: CREDENTIAL_PROVIDER;
  getClient(tenantId: number, appId?: string): Promise<TClient>;
  invalidate(tenantId: number, appId?: string): Promise<void>;
}
