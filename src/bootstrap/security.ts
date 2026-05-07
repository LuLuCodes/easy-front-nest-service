import type { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

export function applySecurity(app: NestExpressApplication, config: ConfigService): void {
  if (config.get('app.node_env') === 'production') {
    app.use(helmet());
  }

  app.enableCors({
    origin: true,
    allowedHeaders: 'Content-Type, X-XSRF-Token, CSRF-Token, X-CSRF-Token, X-Auth-Token',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
}
