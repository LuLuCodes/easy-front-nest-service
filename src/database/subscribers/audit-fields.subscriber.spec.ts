import type { DataSource, InsertEvent, UpdateEvent } from 'typeorm';

import { AuditFieldsSubscriber } from './audit-fields.subscriber';
import type { TenantContextService } from '@tenant/tenant-context.service';

function makeSubscriber(ctxValue: { tenantId: number } | undefined = undefined) {
  const subs: AuditFieldsSubscriber[] = [];
  const dataSource = { subscribers: subs } as unknown as DataSource;
  const tenantContext = {
    get: jest.fn().mockReturnValue(ctxValue),
  } as unknown as jest.Mocked<TenantContextService>;
  const sub = new AuditFieldsSubscriber(dataSource, tenantContext);
  sub.onModuleInit();
  return { sub, tenantContext, dataSource };
}

describe('AuditFieldsSubscriber', () => {
  it('registers itself with the data source on onModuleInit', () => {
    const { sub, dataSource } = makeSubscriber();
    expect(dataSource.subscribers).toContain(sub);
  });

  describe('beforeInsert', () => {
    it('throws when created_by is missing', () => {
      const { sub } = makeSubscriber();
      expect(() => sub.beforeInsert({ entity: {} } as InsertEvent<unknown>)).toThrow(
        '缺少created_by字段',
      );
    });

    it('defaults updated_by to created_by when missing', () => {
      const { sub } = makeSubscriber();
      const entity: Record<string, unknown> = { created_by: 5, tenant_id: 1 };
      sub.beforeInsert({ entity } as InsertEvent<unknown>);
      expect(entity.updated_by).toBe(5);
    });

    it('stamps tenant_id from the AsyncLocalStorage context when missing', () => {
      const { sub } = makeSubscriber({ tenantId: 9 });
      const entity: Record<string, unknown> = { created_by: 1 };
      sub.beforeInsert({ entity } as InsertEvent<unknown>);
      expect(entity.tenant_id).toBe(9);
    });

    it('leaves an explicit tenant_id alone', () => {
      const { sub, tenantContext } = makeSubscriber({ tenantId: 9 });
      const entity: Record<string, unknown> = { created_by: 1, tenant_id: 99 };
      sub.beforeInsert({ entity } as InsertEvent<unknown>);
      expect(entity.tenant_id).toBe(99);
      // The context fast-path is taken only when tenant_id is missing.
      expect(tenantContext.get).not.toHaveBeenCalled();
    });

    it('no-ops when the event has no entity', () => {
      const { sub } = makeSubscriber();
      expect(() => sub.beforeInsert({ entity: undefined } as InsertEvent<unknown>)).not.toThrow();
    });
  });

  describe('beforeUpdate', () => {
    it('throws when updated_by is missing', () => {
      const { sub } = makeSubscriber();
      expect(() => sub.beforeUpdate({ entity: {} } as UpdateEvent<unknown>)).toThrow(
        '缺少updated_by字段',
      );
    });

    it('strips created_by and tenant_id from the update payload', () => {
      const { sub } = makeSubscriber();
      const entity: Record<string, unknown> = {
        updated_by: 5,
        created_by: 1,
        tenant_id: 99,
      };
      sub.beforeUpdate({ entity } as UpdateEvent<unknown>);
      expect(entity.created_by).toBeUndefined();
      expect(entity.tenant_id).toBeUndefined();
    });

    it('no-ops when the event has no entity', () => {
      const { sub } = makeSubscriber();
      expect(() => sub.beforeUpdate({ entity: undefined } as UpdateEvent<unknown>)).not.toThrow();
    });
  });
});
