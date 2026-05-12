import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Fastify-friendly request logger. Runs as a Nest middleware (which under
 * the Fastify adapter wraps a preHandler hook), records request shape on
 * entry, then schedules a one-shot 'finish' listener on the underlying
 * raw response to capture status code.
 *
 * The previous Express version patched `res.write` / `res.end` to capture
 * the response body. Fastify doesn't expose those on FastifyReply, and
 * capturing the response body is rarely worth its cost; this version logs
 * a compact summary on completion.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: (err?: unknown) => void): void {
    const start = Date.now();
    const ip =
      (req.headers['x-forwarded-for'] as string | undefined) ?? req.socket?.remoteAddress ?? '';
    const ua = req.headers['user-agent'] as string | undefined;
    const referer = req.headers.referer as string | undefined;

    res.on('finish', () => {
      const status = res.statusCode ?? 0;
      const elapsed = Date.now() - start;
      const line = `${req.method} ${req.url} ${status} ${elapsed}ms ip=${ip} ref=${referer ?? ''} ua=${ua ?? ''}`;
      if (status >= 500) this.logger.error(line);
      else if (status >= 400) this.logger.warn(line);
      else this.logger.log(line);
    });

    next();
  }
}
