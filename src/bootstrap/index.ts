import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

import { applyBodyParsers } from './body';
import { applyGlobalProviders } from './global';
import { applySecurity } from './security';
import { applySwagger } from './swagger';

export async function applyBootstrap(app: NestFastifyApplication): Promise<void> {
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  // URI-style versioning: existing routes stay accessible at both
  // `/api/<resource>` and `/api/v1/<resource>` to avoid breaking
  // current clients. New endpoints opt into a higher version via
  // `@Version('2')` and resolve under `/api/v2/<resource>`.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });
  await applySecurity(app, config);
  await applyBodyParsers(app);
  applyGlobalProviders(app);
  applySwagger(app, config);
}

export { printBanner } from './banner';
