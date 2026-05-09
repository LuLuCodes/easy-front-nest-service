import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { applyBodyParsers } from './body';
import { applyGlobalProviders } from './global';
import { applySecurity } from './security';
import { applySwagger } from './swagger';

export function applyBootstrap(app: NestExpressApplication): void {
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  applySecurity(app, config);
  applyBodyParsers(app);
  applyGlobalProviders(app);
  applySwagger(app, config);
}

export { printBanner } from './banner';
