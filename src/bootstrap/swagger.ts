import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const ENABLED_ENVS = new Set(['development', 'test']);

export function applySwagger(app: INestApplication, config: ConfigService): void {
  const env = config.get<string>('app.node_env');
  if (!ENABLED_ENVS.has(env)) return;

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.get('app.name'))
    .setDescription(config.get('app.desc'))
    .setVersion(config.get('app.version'))
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
}
