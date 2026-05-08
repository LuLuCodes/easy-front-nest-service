import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

/**
 * Replicates the audit-field guarantees previously enforced by the
 * Sequelize global hooks in app.module.ts:
 *
 * - inserts must carry created_by
 * - updated_by defaults to created_by on insert when missing
 * - updates must carry updated_by
 * - created_by is removed from update payload (immutable)
 *
 * The dead `request_id` filter and `afterBulkDestroy` deleted_by writer
 * from the old hooks are not replicated — neither was used in the
 * current codebase (see P3 investigation in docs/REFACTOR_PLAN.md).
 */
@EventSubscriber()
export class AuditFieldsSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<unknown>): void {
    const entity = event.entity as Record<string, unknown> | undefined;
    if (!entity) return;

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
  }
}
