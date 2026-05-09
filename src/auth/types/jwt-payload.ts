export interface JwtAccessPayload {
  sub: number;
  account_id: string;
  login_client?: number;
  role_type?: number;
  roles: string[];
  permissions: string[];
}

export interface JwtRefreshPayload {
  sub: number;
  account_id: string;
  jti: string;
}

export interface AuthenticatedUser extends JwtAccessPayload {
  id: number;
}

export interface AuthorityBundle {
  roles: string[];
  permissions: string[];
}
