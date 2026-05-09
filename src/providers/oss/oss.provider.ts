import { Injectable } from '@nestjs/common';

import { CredentialMissingError, type Provider } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import { TenantCredentialVault } from '@tenant/credential-vault.service';

import { OssClient } from './oss.client';

@Injectable()
export class OssProvider implements Provider<OssClient> {
  readonly name = CREDENTIAL_PROVIDER.oss;

  private readonly clients = new Map<string, OssClient>();

  constructor(private readonly vault: TenantCredentialVault) {}

  async getClient(tenantId: number, bucket?: string): Promise<OssClient> {
    const credential = await this.vault.get(tenantId, this.name, bucket);
    if (!credential) throw new CredentialMissingError(this.name, tenantId);

    const cacheKey = `${tenantId}:${credential.app_id}`;
    let client = this.clients.get(cacheKey);
    if (client) return client;

    client = new OssClient({ credential });
    this.clients.set(cacheKey, client);
    return client;
  }

  async invalidate(tenantId: number, bucket?: string): Promise<void> {
    if (bucket) {
      this.clients.delete(`${tenantId}:${bucket}`);
    } else {
      const prefix = `${tenantId}:`;
      for (const k of this.clients.keys()) {
        if (k.startsWith(prefix)) this.clients.delete(k);
      }
    }
    await this.vault.invalidate(tenantId, this.name, bucket);
  }
}
