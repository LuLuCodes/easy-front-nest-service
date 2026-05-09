export interface TenantContext {
  tenantId: number;
  userId: number;
  accountId: string;
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
}
