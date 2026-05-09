import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const KEY_RE = /^[A-Za-z0-9._\-/]+$/;

export class BucketOptionalDto {
  @ApiPropertyOptional({ description: 'OSS bucket (留空使用租户默认)' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly bucket?: string;
}

export class SignedUrlDto extends BucketOptionalDto {
  @ApiProperty({ description: 'Object key (no leading slash)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  @Matches(KEY_RE, { message: 'key contains illegal characters' })
  readonly key!: string;

  @ApiPropertyOptional({ description: '有效期 (秒), 默认 1800, 上限 7d' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7 * 24 * 3600)
  readonly expires_seconds?: number;

  @ApiPropertyOptional({ description: 'HTTP 方法, GET 下载 / PUT 上传', default: 'GET' })
  @IsOptional()
  @IsIn(['GET', 'PUT'])
  readonly method?: 'GET' | 'PUT';

  @ApiPropertyOptional({ description: 'Content-Type, 仅 PUT 时使用' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly content_type?: string;
}

export class SignUploadParamsDto extends BucketOptionalDto {
  @ApiPropertyOptional({ description: '允许的最大上传大小 (MB), 默认 10', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2048)
  readonly max_size_mb?: number;

  @ApiPropertyOptional({ description: 'Policy 有效期 (秒), 默认 3600', default: 3600 })
  @IsOptional()
  @IsInt()
  @Min(60)
  @Max(7 * 24 * 3600)
  readonly expires_seconds?: number;

  @ApiPropertyOptional({ description: 'key starts-with 约束, 例: "uploads/2026/"' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @Matches(KEY_RE, { message: 'dir contains illegal characters' })
  readonly dir?: string;
}

export class UploadDto extends BucketOptionalDto {
  @ApiPropertyOptional({ description: 'Object key 前缀目录' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @Matches(KEY_RE, { message: 'oss_path contains illegal characters' })
  readonly oss_path?: string;
}
