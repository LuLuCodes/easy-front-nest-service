import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { DocumentBuilder, type OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

const ENABLED_ENVS = new Set(['development', 'test']);

/** Shared `DocumentBuilder` setup — reused by both the runtime UI and
 * the standalone `scripts/export-openapi.ts` exporter so the spec
 * served at `/api-doc` and the spec checked into CI artifacts can
 * never drift. */
export function buildSwaggerOptions(config: { name?: string; desc?: string; version?: string }) {
  return new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.name ?? '')
    .setDescription(config.desc ?? '')
    .setVersion(config.version ?? '')
    .build();
}

export function createOpenApiDocument(app: INestApplication, config: ConfigService): OpenAPIObject {
  const options = buildSwaggerOptions({
    name: config.get<string>('app.name'),
    desc: config.get<string>('app.desc'),
    version: config.get<string>('app.version'),
  });
  return SwaggerModule.createDocument(app, options);
}

export function applySwagger(app: INestApplication, config: ConfigService): void {
  const env = config.get<string>('app.node_env') ?? 'production';
  if (!ENABLED_ENVS.has(env)) return;

  const document = createOpenApiDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
}
