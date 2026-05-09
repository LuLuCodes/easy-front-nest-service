import { Injectable } from '@nestjs/common';

import { CredentialMissingError, type Provider } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import { TenantCredentialVault } from '@tenant/credential-vault.service';

import { createAlipaySdk } from './alipay-sdk.factory';
import { AlipayClient } from './alipay.client';

@Injectable()
export class AlipayProvider implements Provider<AlipayClient> {
  readonly name = CREDENTIAL_PROVIDER.alipay;

  private readonly clients = new Map<string, AlipayClient>();

  constructor(private readonly vault: TenantCredentialVault) {}

  async getClient(tenantId: number, appId?: string): Promise<AlipayClient> {
    const credential = await this.vault.get(tenantId, this.name, appId);
    if (!credential) throw new CredentialMissingError(this.name, tenantId);

    const cacheKey = `${tenantId}:${credential.app_id}`;
    let client = this.clients.get(cacheKey);
    if (client) return client;

    client = new AlipayClient({ sdk: createAlipaySdk(credential), credential });
    this.clients.set(cacheKey, client);
    return client;
  }

  async invalidate(tenantId: number, appId?: string): Promise<void> {
    if (appId) {
      this.clients.delete(`${tenantId}:${appId}`);
    } else {
      const prefix = `${tenantId}:`;
      for (const k of this.clients.keys()) {
        if (k.startsWith(prefix)) this.clients.delete(k);
      }
    }
    await this.vault.invalidate(tenantId, this.name, appId);
  }
}
