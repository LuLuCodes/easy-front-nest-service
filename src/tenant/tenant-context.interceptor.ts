import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import type { AuthenticatedUser } from '@auth/types/jwt-payload';

import { SYSTEM_TENANT_ID } from './constants';
import { TenantContextService } from './tenant-context.service';
import type { TenantContext } from './types/tenant-context';

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  constructor(private readonly tenantContext: TenantContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;

    const ctx: TenantContext = {
      tenantId: user?.tenant_id ?? SYSTEM_TENANT_ID,
      userId: user?.id ?? 0,
      accountId: user?.account_id ?? '',
      roles: user?.roles ?? [],
      permissions: user?.permissions ?? [],
      isSuperAdmin: user?.is_super_admin === true,
    };

    return new Observable((subscriber) => {
      this.tenantContext.run(ctx, () => {
        next.handle().subscribe({
          next: (value) => subscriber.next(value),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
