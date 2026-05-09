import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

const AMOUNT_RE = /^\d+(\.\d{1,2})?$/;

export class AppIdOptionalDto {
  @ApiPropertyOptional({ description: 'alipay app_id (留空使用租户默认)' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly app_id?: string;
}

export class PrecreateDto extends AppIdOptionalDto {
  @ApiProperty({ description: '商户订单号 (≤64)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly out_trade_no!: string;

  @ApiProperty({ description: '金额, 元, 字符串, 最多两位小数' })
  @IsString()
  @Matches(AMOUNT_RE, { message: 'total_amount must be a decimal with up to 2 fractional digits' })
  readonly total_amount!: string;

  @ApiProperty({ description: '订单标题' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly subject!: string;

  @ApiPropertyOptional({ description: '商品描述' })
  @IsOptional()
  @IsString()
  @MaxLength(400)
  readonly body?: string;

  @ApiPropertyOptional({ description: '订单超时时间, 例: 90m / 1d' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly time_expire?: string;

  @ApiPropertyOptional({ description: '回调通知 URL (覆盖租户默认)' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  readonly notify_url?: string;
}

export class FaceToFaceDto extends PrecreateDto {
  @ApiProperty({ description: '买家条码扫码取得的 auth_code' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly auth_code!: string;
}

export class PageOrderDto extends PrecreateDto {
  @ApiPropertyOptional({ description: '页面跳转回调 URL' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  readonly return_url?: string;
}

export class WapOrderDto extends PageOrderDto {
  @ApiPropertyOptional({ description: '用户取消支付时跳转 URL' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  readonly quit_url?: string;
}

export class AppOrderDto extends PrecreateDto {}

export class TradeQueryDto extends AppIdOptionalDto {
  @ApiPropertyOptional({ description: '商户订单号 (out_trade_no 与 trade_no 二选一)' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly out_trade_no?: string;

  @ApiPropertyOptional({ description: '支付宝交易号' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly trade_no?: string;
}

export class RefundDto extends TradeQueryDto {
  @ApiProperty({ description: '退款金额, 元' })
  @IsString()
  @Matches(AMOUNT_RE)
  readonly refund_amount!: string;

  @ApiPropertyOptional({ description: '退款请求号 (≤64)' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly out_request_no?: string;

  @ApiPropertyOptional({ description: '退款原因' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly refund_reason?: string;
}

export class RefundQueryDto extends AppIdOptionalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly out_trade_no?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly trade_no?: string;

  @ApiProperty({ description: '退款请求号' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly out_request_no!: string;
}

export class PageHttpMethodDto {
  @ApiPropertyOptional({ description: '回包形态: GET=URL, POST=Form HTML', default: 'POST' })
  @IsOptional()
  @IsIn(['GET', 'POST'])
  readonly http_method?: 'GET' | 'POST';
}
