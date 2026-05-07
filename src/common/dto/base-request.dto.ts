import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class BaseRequestDto {
  @ApiPropertyOptional({ description: '时间戳', type: Number })
  @IsOptional()
  @IsInt({ message: 'timestamp必须为有效整数' })
  readonly timestamp?: number;

  @ApiPropertyOptional({ description: '签名', type: String })
  @IsOptional()
  @IsString({ message: 'sign必须为字符串' })
  readonly sign?: string;
}
