import type { ConfigService } from '@nestjs/config';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';

export async function applySecurity(
  app: NestFastifyApplication,
  config: ConfigService,
): Promise<void> {
  if (config.get('app.node_env') === 'production') {
    // Cast: see note in body.ts about Fastify plugin type augmentation.

    await app.register(fastifyHelmet as any);
  }

  app.enableCors({
    origin: true,
    allowedHeaders: 'Authorization, Content-Type, X-XSRF-Token, CSRF-Token, X-CSRF-Token',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
}
