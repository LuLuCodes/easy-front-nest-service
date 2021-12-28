import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  ValidateNested,
  MaxLength,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MediaType {
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  THUMB = 'thumb',
  NEWS = 'news',
}

export class AppIdDTO {
  @ApiPropertyOptional({
    description: '微信公众号appId',
    type: String,
    maxLength: 1,
    minLength: 20,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'appId不能为空' })
  @IsString({ message: 'appId必须为字符串' })
  @Length(18, 32, { message: 'appId长度18~32' })
  readonly appId?: string;
}

export class MediaIdDTO extends AppIdDTO {
  @ApiProperty({
    description: '媒体文件ID',
    type: String,
  })
  @IsNotEmpty({ message: 'mediaId不能为空' })
  @IsString({ message: 'mediaId必须为字符串' })
  readonly mediaId: string;
}

export class MediaArticles {
  @ApiProperty({
    description: '标题',
    type: String,
  })
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须为字符串' })
  readonly title: string;

  @ApiProperty({
    description: '图文消息的封面图片素材id（必须是永久mediaID）',
    type: String,
  })
  @IsNotEmpty({ message: '图片素材id不能为空' })
  @IsString({ message: '图片素材id必须为字符串' })
  readonly thumb_media_id: string;

  @ApiPropertyOptional({
    description: '作者',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '作者必须为字符串' })
  readonly author?: string;

  @ApiPropertyOptional({
    description: '图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '摘要必须为字符串' })
  readonly digest?: string;

  @ApiProperty({
    description: '是否显示封面',
    type: Boolean,
  })
  readonly show_cover_pic: boolean;

  @ApiProperty({
    description:
      '图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS',
    type: String,
  })
  @IsNotEmpty({ message: '具体内容不能为空' })
  @IsString({ message: '具体内容必须为字符串' })
  readonly content: string;

  @ApiProperty({
    description: '图文消息的原文地址，即点击“阅读原文”后的URL',
    type: String,
  })
  @IsNotEmpty({ message: '原文地址不能为空' })
  @IsString({ message: '原文地址必须为字符串' })
  readonly content_source_url: string;

  @ApiPropertyOptional({
    description: '是否打开评论，0不打开，1打开',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'need_open_comment必须为有效整数' })
  readonly need_open_comment?: number;

  @ApiPropertyOptional({
    description: '是否粉丝才可评论，0所有人可评论，1粉丝才可评论',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'only_fans_can_comment必须为有效整数' })
  readonly only_fans_can_comment?: number;
}

export class AddNewsDTO extends AppIdDTO {
  @ApiProperty({
    description: '永久图文素材数组',
    type: [MediaArticles],
  })
  @ValidateNested({ each: true })
  @Type(() => MediaArticles)
  @ArrayMinSize(1, {
    message: '必须包含一个永久图文素材',
  })
  readonly mediaArticles: MediaArticles[];
}

export class UpdateNewsDTO extends AppIdDTO {
  @ApiProperty({
    description: '要修改的图文消息的id',
    type: String,
  })
  @IsNotEmpty({ message: 'mediaId不能为空' })
  @IsString({ message: 'mediaId必须为字符串' })
  readonly mediaId: string;

  @ApiProperty({
    description:
      '要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0',
    type: Number,
  })
  @IsInt({ message: 'index必须为有效整数' })
  @Min(0, { message: 'index必须大于等于0' })
  readonly index: number;

  @ApiProperty({
    description: '永久图文素材数组',
    type: MediaArticles,
  })
  @ValidateNested({ each: true })
  @Type(() => MediaArticles)
  readonly mediaArticles: MediaArticles;
}

export class BatchGetMaterialDTO extends AppIdDTO {
  @ApiProperty({
    description:
      '素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）',
    enum: MediaType,
  })
  @IsEnum(MediaType)
  readonly mediaType: MediaType;

  @ApiPropertyOptional({
    description: '从全部素材的该偏移位置开始返回，0表示从第一个素材返回',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'offset必须为有效整数' })
  @Min(0, { message: 'offset必须大于等于0' })
  readonly offset?: number;

  @ApiPropertyOptional({
    description: '返回素材的数量，取值在1到20之间',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'count必须为有效整数' })
  @Min(1, { message: 'count必须大于等于1' })
  @Max(20, { message: 'count必须小于等于20' })
  readonly count?: number;
}
