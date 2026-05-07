import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CacheParamsDto {
  @ApiPropertyOptional({ description: '缓存 key', type: String })
  @IsOptional()
  @IsString({ message: 'cache_key必须为字符串' })
  readonly cache_key?: string;

  @ApiPropertyOptional({ description: '需删除的缓存 key 列表', type: [String] })
  @IsOptional()
  @IsArray({ message: 'del_cache_key必须为数组' })
  readonly del_cache_key?: string[];

  @ApiPropertyOptional({
    description: '缓存模式：EX 或 PX，不传默认 EX',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'cache_mode必须为字符串' })
  readonly cache_mode?: string;

  @ApiPropertyOptional({
    description: '缓存时长，不传时 1~20 秒随机',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'cache_time必须为有效整数' })
  @Min(1, { message: 'cache_time必须大于等于1' })
  readonly cache_time?: number;
}
