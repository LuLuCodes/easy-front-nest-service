import { ConfigService } from '@nestjs/config';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

import { applyBodyParsers } from './body';
import { applyGlobalProviders } from './global';
import { applySecurity } from './security';
import { applySwagger } from './swagger';

export async function applyBootstrap(app: NestFastifyApplication): Promise<void> {
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  await applySecurity(app, config);
  await applyBodyParsers(app);
  applyGlobalProviders(app);
  applySwagger(app, config);
}

export { printBanner } from './banner';
