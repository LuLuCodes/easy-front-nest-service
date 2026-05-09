import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AppIdOptionalDto {
  @ApiPropertyOptional({ description: '指定凭证 app_id (留空则使用租户默认)' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly app_id?: string;
}

export class Code2SessionDto extends AppIdOptionalDto {
  @ApiProperty({ description: 'wx.login() 返回的 js_code' })
  @IsString()
  @IsNotEmpty()
  readonly js_code!: string;
}

export class DecryptUserDataDto extends AppIdOptionalDto {
  @ApiProperty({ description: 'session_key (base64) — 由 code2Session 返回' })
  @IsString()
  @IsNotEmpty()
  readonly session_key!: string;

  @ApiProperty({ description: 'encryptedData (base64)' })
  @IsString()
  @IsNotEmpty()
  readonly encrypted_data!: string;

  @ApiProperty({ description: 'iv (base64)' })
  @IsString()
  @IsNotEmpty()
  readonly iv!: string;
}

export class CreateQrCodeDto extends AppIdOptionalDto {
  @ApiProperty({ description: '页面路径，例如 pages/index/index' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly path!: string;

  @ApiPropertyOptional({ description: '二维码宽度 px', default: 430 })
  @IsOptional()
  @IsInt()
  @Min(280)
  @Max(1280)
  readonly width?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly auto_color?: boolean;

  @ApiPropertyOptional({ description: 'auto_color=false 时生效' })
  @IsOptional()
  @IsObject()
  readonly line_color?: { r: number; g: number; b: number };

  @ApiPropertyOptional({ description: '是否需要透明底色' })
  @IsOptional()
  @IsBoolean()
  readonly is_hyaline?: boolean;
}

export class CreateUnlimitedQrCodeDto extends AppIdOptionalDto {
  @ApiProperty({ description: '场景值, 最大 32 字节' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly scene!: string;

  @ApiPropertyOptional({ description: '页面路径' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(280)
  @Max(1280)
  readonly width?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly check_path?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly auto_color?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly line_color?: { r: number; g: number; b: number };

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly is_hyaline?: boolean;

  @ApiPropertyOptional({ enum: ['release', 'trial', 'develop'] })
  @IsOptional()
  @IsEnum({ release: 'release', trial: 'trial', develop: 'develop' })
  readonly env_version?: 'release' | 'trial' | 'develop';
}

export class GenerateUrlSchemeDto extends AppIdOptionalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly jump_wxa?: { path: string; query?: string; env_version?: string };

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly is_expire?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly expire_time?: number;

  @ApiPropertyOptional({ description: '0=按 expire_time 失效 1=按 expire_interval' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  readonly expire_type?: 0 | 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly expire_interval?: number;
}

export class GenerateUrlLinkDto extends AppIdOptionalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly path?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly query?: string;

  @ApiPropertyOptional({ enum: ['release', 'trial', 'develop'] })
  @IsOptional()
  @IsEnum({ release: 'release', trial: 'trial', develop: 'develop' })
  readonly env_version?: 'release' | 'trial' | 'develop';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly is_expire?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  readonly expire_type?: 0 | 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly expire_time?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  readonly expire_interval?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly cloud_base?: Record<string, unknown>;
}
