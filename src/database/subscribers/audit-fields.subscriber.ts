import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { TenantContextService } from '@tenant/tenant-context.service';

/**
 * Replicates the audit-field guarantees previously enforced by the
 * Sequelize global hooks in app.module.ts:
 *
 * - inserts must carry created_by
 * - updated_by defaults to created_by on insert when missing
 * - updates must carry updated_by
 * - created_by is removed from update payload (immutable)
 *
 * Also injects tenant_id from the AsyncLocalStorage context if the
 * entity didn't supply one. Once P5-2 lands, every authenticated
 * request runs inside a TenantContextInterceptor scope, so the
 * subscriber just stamps from there. Outside of a request scope
 * (CLI/migrations/cron) the entity must set tenant_id explicitly.
 */
@Injectable()
@EventSubscriber()
export class AuditFieldsSubscriber implements EntitySubscriberInterface {
  constructor(
    dataSource: DataSource,
    private readonly tenantContext: TenantContextService,
  ) {
    dataSource.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<unknown>): void {
    const entity = event.entity as Record<string, unknown> | undefined;
    if (!entity) return;

    if (entity.tenant_id === undefined || entity.tenant_id === null) {
      const ctx = this.tenantContext.get();
      if (ctx) entity.tenant_id = ctx.tenantId;
    }

    if (entity.created_by === undefined || entity.created_by === null) {
      throw new Error('缺少created_by字段');
    }
    if (entity.updated_by === undefined || entity.updated_by === null) {
      entity.updated_by = entity.created_by;
    }
  }

  beforeUpdate(event: UpdateEvent<unknown>): void {
    const entity = event.entity as Record<string, unknown> | undefined;
    if (!entity) return;

    if (entity.updated_by === undefined || entity.updated_by === null) {
      throw new Error('缺少updated_by字段');
    }
    delete entity.created_by;
    delete entity.tenant_id;
  }
}
