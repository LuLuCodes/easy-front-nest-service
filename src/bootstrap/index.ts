import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { applyBodyParsers } from './body';
import { applyGlobalProviders } from './global';
import { applySecurity } from './security';
import { applySession } from './session';
import { applySwagger } from './swagger';

export async function applyBootstrap(app: NestExpressApplication): Promise<void> {
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  applySecurity(app, config);
  applyBodyParsers(app);
  applyGlobalProviders(app);
  await applySession(app, config);
  applySwagger(app, config);
}

export { printBanner } from './banner';
