import type { INestApplication } from '@nestjs/common';

import { AllExceptionsFilter } from '@filter/any-exception.filter';
import { HttpExceptionFilter } from '@filter/http-exception.filter';
import { ValidationExceptionFilter } from '@filter/validation-exception-filter';
import { TransformInterceptor } from '@interceptor/transform.interceptor';

export function applyGlobalProviders(app: INestApplication): void {
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
}
