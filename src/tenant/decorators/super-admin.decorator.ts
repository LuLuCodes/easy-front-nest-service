import { SetMetadata } from '@nestjs/common';

export const SUPER_ADMIN_KEY = 'tenant:superAdminOnly';

export const SuperAdminOnly = (): MethodDecorator & ClassDecorator =>
  SetMetadata(SUPER_ADMIN_KEY, true);
