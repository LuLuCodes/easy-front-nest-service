import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UsePipes,
  Session,
  Headers,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheKey } from '@config/global';
import { CatchError } from '@decorator/catch.decorator';
import { md5 } from '@libs/cryptogram';
import { CacheService } from '@service/cache.service';
import { CustomerService } from './customer.service';

import {
  LoginByWeChatDTO,
  BindPhoneAndEmailDTO,
  CreateOrUpdateAddressDTO,
  GetAddressDTO,
  CreateOrUpdateCartItemDTO,
  UpdateCartItemStatusDTO,
  GetCustomerDTO,
} from './customer.dto';

@ApiTags('用户API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('customer')
export class CustomerController {
  private cookie_key = '';
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
  ) {
    this.cookie_key = this.configService.get('session.key');
  }

  @ApiOperation({
    summary: '微信授权登录',
    description: '微信授权登录',
  })
  @ApiBody({
    description: '请求参数',
    type: LoginByWeChatDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login-by-wechat')
  async loginByWeChat(
    @Headers() headers,
    @Session() session,
    @Body() body: LoginByWeChatDTO,
  ): Promise<any> {
    const response = await this.customerService.loginByWeChat(body, headers);
    const { data } = response;

    const token_str = `${this.cookie_key}${JSON.stringify({
      id: data.accout_id,
      code: data.account_code,
    })}${this.cookie_key}`;
    const authToken = md5(token_str).toString();
    session.authToken = authToken;
    session.user = {
      id: data.accout_id,
      code: data.account_code,
      customer_id: data.customer_id,
      customer_code: data.customer_code,
      wx_openid: data.wx_openid,
      wx_unionid: data.wx_unionid,
    };
    // 小程序没有session，因此暂存在redis，在auth.guard中通过authToken再取出来
    await this.cacheService.set(
      `${CacheKey.SESSION_USER}_${authToken}`,
      JSON.stringify(session.user),
    );
    response.data.token = authToken;
    delete response.data.wx_openid;
    delete response.data.wx_unionid;
    return response;
  }

  @ApiOperation({
    summary: '绑定手机号和邮箱',
    description: '绑定手机号和邮箱',
  })
  @ApiBody({
    description: '请求参数',
    type: BindPhoneAndEmailDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('bind-phone-and-email')
  async bindPhoneAndEmail(
    @Session() session,
    @Body() body: BindPhoneAndEmailDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.bindPhoneAndEmail(body, user);
    return response;
  }

  @ApiOperation({
    summary: '创建或更新收货地址',
    description: '创建或更新收货地址',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateOrUpdateAddressDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-address')
  async setAddress(
    @Session() session,
    @Body() body: CreateOrUpdateAddressDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.setAddress(body, user);
    return response;
  }

  @ApiOperation({
    summary: '获取收货地址',
    description: '获取收货地址',
  })
  @ApiBody({
    description: '请求参数',
    type: GetAddressDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-address')
  async getAddress(
    @Session() session,
    @Body() body: GetAddressDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.getAddress(body, user);
    return response;
  }

  @ApiOperation({
    summary: '设置购物车',
    description: '设置购物车',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateOrUpdateCartItemDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-cart-item')
  async setCartItem(
    @Session() session,
    @Body() body: CreateOrUpdateCartItemDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.setCartItem(body, user);
    return response;
  }

  @ApiOperation({
    summary: '更新购物车',
    description: '更新购物车',
  })
  @ApiBody({
    description: '请求参数',
    type: UpdateCartItemStatusDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('update-cart-item-status')
  async updateCartItemStatus(
    @Session() session,
    @Body() body: UpdateCartItemStatusDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.updateCartItemStatus(
      body,
      user,
    );
    return response;
  }

  @ApiOperation({
    summary: '获取session',
    description: '获取session',
  })
  @ApiBody({
    description: '请求参数',
    type: Object,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-session')
  async getSession(@Headers() headers, @Session() session): Promise<any> {
    let { user } = session;
    let { authToken } = session;
    if (headers['x-auth-token']) {
      authToken = headers['x-auth-token'];
    }
    if (!user) {
      user = await this.cacheService.get(
        `${CacheKey.SESSION_USER}_${authToken}`,
      );
      if (user) {
        user = JSON.parse(user);
        session.user = user;
      } else {
        throw new Error('用户未登录');
      }
    }
    return { ...user, token: authToken };
  }

  // 获取购物车
  @ApiOperation({
    summary: '获取收货地址',
    description: '获取收货地址',
  })
  @ApiBody({
    description: '请求参数',
    type: GetCustomerDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-carts')
  async getCart(
    @Session() session,
    @Body() body: GetCustomerDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.getCart(body, user);
    return response;
  }
  // end

  // 获取购物车
  @ApiOperation({
    summary: '获取用户详情',
    description: '获取用户详情',
  })
  @ApiBody({
    description: '请求参数',
    type: GetCustomerDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-customer')
  async getCustomer(
    @Session() session,
    @Body() body: GetCustomerDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.customerService.getCustomer(body, user);
    return response;
  }
  // end
}
