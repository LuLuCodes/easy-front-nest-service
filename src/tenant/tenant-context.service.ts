import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

import { SYSTEM_TENANT_ID } from './constants';
import type { TenantContext } from './types/tenant-context';

@Injectable()
export class TenantContextService {
  private readonly storage = new AsyncLocalStorage<TenantContext>();

  run<T>(context: TenantContext, fn: () => T): T {
    return this.storage.run(context, fn);
  }

  get(): TenantContext | undefined {
    return this.storage.getStore();
  }

  require(): TenantContext {
    const ctx = this.storage.getStore();
    if (!ctx) {
      throw new Error('Tenant context not initialized');
    }
    return ctx;
  }

  tenantId(): number {
    return this.get()?.tenantId ?? SYSTEM_TENANT_ID;
  }

  isSuperAdmin(): boolean {
    return this.get()?.isSuperAdmin === true;
  }
}
