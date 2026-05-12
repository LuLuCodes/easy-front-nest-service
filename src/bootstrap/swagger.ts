import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const ENABLED_ENVS = new Set(['development', 'test']);

export function applySwagger(app: INestApplication, config: ConfigService): void {
  const env = config.get<string>('app.node_env') ?? 'production';
  if (!ENABLED_ENVS.has(env)) return;

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.get<string>('app.name') ?? '')
    .setDescription(config.get<string>('app.desc') ?? '')
    .setVersion(config.get<string>('app.version') ?? '')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
}
