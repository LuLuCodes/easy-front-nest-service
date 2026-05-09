import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  CREDENTIAL_PROVIDER,
  CREDENTIAL_STATUS,
  TENANT_STATUS,
  TENANT_USER_ROLE,
} from '@entities/index';

export class CreateTenantDto {
  @ApiProperty({ description: '租户编码 kebab-case', example: 'acme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  @Matches(/^[a-z0-9][a-z0-9-]*$/, { message: 'code 必须为 kebab-case' })
  readonly code!: string;

  @ApiProperty({ description: '租户名称' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly name!: string;

  @ApiPropertyOptional({ description: '套餐标签', default: 'free' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly plan?: string;

  @ApiPropertyOptional({ description: '元数据' })
  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, unknown>;
}

export class UpdateTenantDto {
  @ApiPropertyOptional({ description: '租户名称' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly name?: string;

  @ApiPropertyOptional({ description: '租户状态', enum: TENANT_STATUS })
  @IsOptional()
  @IsEnum(TENANT_STATUS)
  readonly status?: TENANT_STATUS;

  @ApiPropertyOptional({ description: '套餐标签' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly plan?: string;

  @ApiPropertyOptional({ description: '元数据' })
  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, unknown>;
}

export class InviteUserDto {
  @ApiProperty({ description: '已存在的用户 ID' })
  @IsInt()
  readonly user_id!: number;

  @ApiProperty({ description: '该用户在此租户的角色', enum: TENANT_USER_ROLE })
  @IsEnum(TENANT_USER_ROLE)
  readonly role_in_tenant!: TENANT_USER_ROLE;

  @ApiPropertyOptional({ description: '是否设为该用户的默认租户', default: false })
  @IsOptional()
  readonly is_default?: boolean;
}

export class SwitchTenantDto {
  @ApiProperty({ description: '目标租户 ID' })
  @IsInt()
  readonly tenant_id!: number;
}

export class CreateCredentialDto {
  @ApiProperty({ description: '外部服务标识', enum: CREDENTIAL_PROVIDER })
  @IsEnum(CREDENTIAL_PROVIDER)
  readonly provider!: CREDENTIAL_PROVIDER;

  @ApiProperty({ description: '应用 ID / 商户号 / Bucket 名' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly app_id!: string;

  @ApiPropertyOptional({ description: '展示标签' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly display_name?: string;

  @ApiProperty({ description: 'Secret 明文（提交后立即加密入库）' })
  @IsString()
  @IsNotEmpty()
  readonly secret!: string;

  @ApiPropertyOptional({ description: '可选证书明文（pem）' })
  @IsOptional()
  @IsString()
  readonly cert?: string;

  @ApiPropertyOptional({ description: '证书序列号' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly cert_serial_no?: string;

  @ApiPropertyOptional({ description: '附加配置' })
  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, unknown>;
}

export class UpdateCredentialStatusDto {
  @ApiProperty({ description: '新状态', enum: CREDENTIAL_STATUS })
  @IsEnum(CREDENTIAL_STATUS)
  readonly status!: CREDENTIAL_STATUS;
}

export class RotateCredentialSecretDto {
  @ApiProperty({ description: '新 secret 明文' })
  @IsString()
  @IsNotEmpty()
  readonly secret!: string;

  @ApiPropertyOptional({ description: '可选新证书明文' })
  @IsOptional()
  @IsString()
  readonly cert?: string;

  @ApiPropertyOptional({ description: '可选新证书序列号' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly cert_serial_no?: string;
}
