import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { applyBootstrap, printBanner } from './bootstrap';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  applyBootstrap(app);

  const port = app.get(ConfigService).get<number>('app.port');
  await app.listen(port);

  printBanner(await app.getUrl());
}

bootstrap();
