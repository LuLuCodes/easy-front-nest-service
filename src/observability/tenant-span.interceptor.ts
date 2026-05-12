import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { Observable } from 'rxjs';

import { TenantContextService } from '@tenant/tenant-context.service';

/**
 * Stamps the active OTel span with `tenant.id` + `tenant.is_super_admin`
 * for every HTTP request handled inside the AsyncLocalStorage scope set
 * up by TenantContextInterceptor. With tracing disabled (no SDK active),
 * `trace.getActiveSpan()` returns undefined and the interceptor is a
 * no-op — no allocation, no overhead.
 */
@Injectable()
export class TenantSpanInterceptor implements NestInterceptor {
  constructor(private readonly tenantContext: TenantContextService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const span = trace.getActiveSpan();
    if (span) {
      try {
        const tenantId = this.tenantContext.tenantId();
        const isSuper = this.tenantContext.isSuperAdmin();
        span.setAttribute('tenant.id', tenantId);
        span.setAttribute('tenant.is_super_admin', isSuper);
      } catch {
        // tenant context not initialized for this request (e.g. health
        // probes, public routes) — leave the span untouched.
      }
    }
    return next.handle();
  }
}
