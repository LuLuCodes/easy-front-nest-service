/**
 * Standalone OpenAPI exporter.
 *
 * Boots the AppModule WITHOUT a network listener, runs Swagger's
 * document generator, writes `openapi.json` to the repo root, and
 * exits. Used by the `pnpm openapi:export` script and by the CI
 * integration job (which already has MySQL + Redis services in scope
 * for the AppModule to boot against).
 */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { createOpenApiDocument } from '../src/bootstrap/swagger';
import { AppModule } from '../src/app.module';

async function main(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
    abortOnError: false,
  });
  app.setGlobalPrefix('api');
  await app.init();

  const document = createOpenApiDocument(app, app.get(ConfigService));
  const out = resolve(__dirname, '..', 'openapi.json');
  writeFileSync(out, JSON.stringify(document, null, 2) + '\n');
  console.log(`openapi: wrote ${Object.keys(document.paths ?? {}).length} paths → ${out}`);

  await app.close();
}

main().catch((err) => {
  console.error('openapi export failed:', err);
  process.exit(1);
});
