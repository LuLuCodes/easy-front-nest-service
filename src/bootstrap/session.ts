import type { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';

import { RedisLock } from '@libs/redlock';

export async function applySession(
  app: NestExpressApplication,
  config: ConfigService,
): Promise<void> {
  const sessionRedis = createClient({
    socket: {
      host: config.get('redis.host'),
      port: config.get('redis.port'),
    },
    password: config.get('redis.password'),
    database: config.get('redis.cookie_db_index'),
  });
  await sessionRedis.connect();

  const isProd = config.get<string>('app.node_env') === 'production';
  const cookieConfig = config.get<Record<string, unknown>>('session.cookie') ?? {};

  app.use(
    session({
      store: new RedisStore({ client: sessionRedis }),
      secret: config.get('session.secret'),
      name: config.get('session.key'),
      cookie: {
        ...cookieConfig,
        secure: isProd,
      },
      resave: true,
      rolling: true,
      saveUninitialized: false,
    }),
  );

  RedisLock.init({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    password: config.get('redis.password'),
    db: config.get('redis.cache_db_index'),
  });
}
