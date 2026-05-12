import { Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { ThrottlerRequest } from '@nestjs/throttler/dist/throttler.guard.interface';

/**
 * Rate limiter with **per-tenant buckets**.
 *
 * The base throttler keys exclusively by remote IP — fine for a single
 * customer but useless for a multi-tenant SaaS where one tenant's
 * traffic could blow the global budget and starve everyone else.
 *
 * When the request is JWT-authenticated, `req.user.tenant_id` is set
 * by `JwtAuthGuard` (which runs ahead of this guard in
 * `APP_GUARD` order). We key by `tenant:<id>:<ip>` so each tenant gets
 * its own bucket. Anonymous routes (login, /health, public endpoints)
 * fall back to `ip:<ip>` exactly as before.
 */
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected errorMessage = 'Rate limit exceeded';

  private trackerKey(req: unknown): string {
    const r = req as {
      headers?: Record<string, unknown>;
      ip?: unknown;
      user?: { tenant_id?: number };
    };
    const ip = String(r.headers?.['x-forwarded-for'] ?? r.ip ?? '');
    const tenantId = r.user?.tenant_id;
    return tenantId != null ? `tenant:${tenantId}:${ip}` : `ip:${ip}`;
  }

  protected getTracker(req: Record<string, any>): Promise<string> {
    return Promise.resolve(this.trackerKey(req));
  }

  async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const { context, limit, ttl, throttler, blockDuration } = requestProps;
    const request = this.getRequestResponse(context).req;

    const tracker = this.trackerKey(request);
    const throttlerName = throttler.name ?? 'default';
    const key = this.generateKey(context, tracker, throttlerName);

    const { totalHits, timeToExpire } = await this.storageService.increment(
      key,
      ttl,
      limit,
      blockDuration,
      throttlerName,
    );

    const response = this.getRequestResponse(context).res;
    if (totalHits > limit) {
      response.header('X-RateLimit-Limit', limit);
      response.header('X-RateLimit-Remaining', 0);
      response.header('X-RateLimit-Reset', Math.ceil(timeToExpire / 1000));
      throw new ThrottlerException(this.errorMessage);
    }

    response.header('X-RateLimit-Limit', limit);
    response.header('X-RateLimit-Remaining', Math.max(0, limit - totalHits));
    response.header('X-RateLimit-Reset', Math.ceil(timeToExpire / 1000));
    return true;
  }
}
