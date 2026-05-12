import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { applyBootstrap, printBanner } from './bootstrap';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 50 * 1024 * 1024,
      trustProxy: true,
    }),
    { bufferLogs: true },
  );
  app.useLogger(app.get(Logger));
  await applyBootstrap(app);

  const port = app.get(ConfigService).get<number>('app.port');
  await app.listen(port, '0.0.0.0');

  printBanner(await app.getUrl());
}

bootstrap();
