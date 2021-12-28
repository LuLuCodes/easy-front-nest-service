import { env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('session', () => ({
  secret: env('COOKIE_SECRET', 'easy-front-nest-service'),
  key: env('COOKIE_KEY', 'easy-front-nest-service'),
  cookie: { secure: false, maxAge: 3 * 24 * 3600 * 1000, httpOnly: true },
}));
