import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
import fastifyMultipart from '@fastify/multipart';
import fastifyCompress from '@fastify/compress';

/**
 * Register body / payload plugins on the Fastify instance.
 *
 * - JSON parsing is built into Fastify.
 * - urlencoded forms need `@fastify/formbody` (alipay async notify).
 * - multipart/form-data via `@fastify/multipart`; controllers pull files
 *   through `req.parts()` / `req.file()`. Max file size = 50 MB.
 * - cookie parsing comes from `@fastify/cookie`, populating `req.cookies`.
 * - response compression via `@fastify/compress`.
 */
export async function applyBodyParsers(app: NestFastifyApplication): Promise<void> {
  // Each plugin augments FastifyInstance via declaration merging, so chained
  // `app.register(...)` calls hit irreconcilable instance-shape conflicts in
  // TS. Cast on register only; runtime is well-defined.

  const register = (plugin: unknown, opts?: unknown) => app.register(plugin as any, opts as any);

  await register(fastifyCookie);
  await register(fastifyFormbody);
  await register(fastifyMultipart, { limits: { fileSize: 50 * 1024 * 1024 } });
  await register(fastifyCompress);
}
