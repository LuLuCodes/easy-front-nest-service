import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
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

export class NetCheckDto extends AppIdOptionalDto {
  @ApiProperty({ description: 'all / dns / ping' })
  @IsIn(['all', 'dns', 'ping'])
  readonly action!: string;

  @ApiProperty({ description: '运营商 DEFAULT / CHINANET / UNICOM / CAP / DNS' })
  @IsString()
  readonly operator!: string;
}

export class GetTempMediaDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly media_id!: string;
}

export class UploadTempMediaDto extends AppIdOptionalDto {
  @ApiProperty({ enum: ['image', 'voice', 'video', 'thumb'] })
  @IsIn(['image', 'voice', 'video', 'thumb'])
  readonly type!: 'image' | 'voice' | 'video' | 'thumb';
}

export class AddNewsDto extends AppIdOptionalDto {
  @ApiProperty({
    description: '图文文章数组',
    type: 'array',
    items: { type: 'object' },
  })
  @IsArray()
  readonly articles!: Array<Record<string, unknown>>;
}

export class UpdateNewsDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  readonly media_id!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  readonly index!: number;

  @ApiProperty()
  readonly articles!: Record<string, unknown>;
}

export class AddPermanentMediaDto extends AppIdOptionalDto {
  @ApiProperty({ enum: ['image', 'voice', 'thumb'] })
  @IsIn(['image', 'voice', 'thumb'])
  readonly type!: 'image' | 'voice' | 'thumb';
}

export class AddVideoMaterialDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  readonly title!: string;

  @ApiProperty()
  @IsString()
  readonly introduction!: string;
}

export class MaterialIdDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly media_id!: string;
}

export class BatchGetMaterialDto extends AppIdOptionalDto {
  @ApiProperty({ enum: ['image', 'video', 'voice', 'news'] })
  @IsIn(['image', 'video', 'voice', 'news'])
  readonly type!: 'image' | 'video' | 'voice' | 'news';

  @ApiProperty({ description: '从 0 开始' })
  @IsInt()
  @Min(0)
  readonly offset!: number;

  @ApiProperty({ description: '1-20' })
  @IsInt()
  @Min(1)
  readonly count!: number;
}

export class JsApiSignDto extends AppIdOptionalDto {
  @ApiProperty({ description: '完整页面 URL（包含 query，不含 #hash）' })
  @IsString()
  @IsNotEmpty()
  readonly url!: string;
}

export class GetAuthorizeUrlDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly redirect_uri!: string;

  @ApiProperty({ enum: ['snsapi_base', 'snsapi_userinfo'] })
  @IsEnum({ snsapi_base: 'snsapi_base', snsapi_userinfo: 'snsapi_userinfo' })
  readonly scope!: 'snsapi_base' | 'snsapi_userinfo';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly state?: string;
}

export class SnsCodeDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code!: string;
}

export class SnsRefreshTokenDto extends AppIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly refresh_token!: string;
}

export class SnsCheckTokenDto {
  @ApiProperty()
  @IsString()
  readonly access_token!: string;

  @ApiProperty()
  @IsString()
  readonly openid!: string;
}

export class SnsUserInfoDto {
  @ApiProperty()
  @IsString()
  readonly access_token!: string;

  @ApiProperty()
  @IsString()
  readonly openid!: string;

  @ApiPropertyOptional({ enum: ['zh_CN', 'zh_TW', 'en'], default: 'zh_CN' })
  @IsOptional()
  @IsIn(['zh_CN', 'zh_TW', 'en'])
  readonly lang?: 'zh_CN' | 'zh_TW' | 'en';
}
