import {
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@service/cache.service';
import { md5 } from '@libs/cryptogram';
import { CacheKey } from '@config/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { session, headers } = request;
    let { user } = session;
    let { authToken } = session;
    if (headers['x-auth-token']) {
      authToken = headers['x-auth-token'];
      user = await this.cacheService.get(
        `${CacheKey.SESSION_USER}_${authToken}`,
      );
      if (user) {
        user = JSON.parse(user);
        session.user = user;
      } else {
        throw new HttpException('用户未登录', HttpStatus.UNAUTHORIZED);
      }
    }
    if (headers['x-from-swagger'] === 'swagger') {
      return true;
    }
    // 如果白名单里面有的url就不拦截
    if (this.hasUrl(this.configService.get('while_list.token'), request.url)) {
      return true;
    }
    if (!authToken) {
      throw new HttpException('缺少authToken', HttpStatus.UNAUTHORIZED);
    }
    const session_key = this.configService.get('session.key');
    const token_str = `${session_key}${JSON.stringify({
      id: user.id,
      code: user.code,
    })}${session_key}`;
    const token = md5(token_str).toString();
    if (authToken !== token) {
      throw new HttpException('authToken错误', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  /**
   * @param {string[]} urlList url列表
   * @param {url} url 当前要判断的url列表
   * @return:
   * @Description: 判断一个url列表中是否包含一个url
   * @Author: qian.qing@aliyun.com
   * @LastEditors: qian.qing@aliyun.com
   * @Date: 2020-08-15 14:28:11
   */
  private hasUrl(urlList: string[], url: string): boolean {
    let flag = false;
    for (const item of urlList) {
      if (Object.is(item.replace(/\//gi, ''), url.replace(/\//gi, ''))) {
        flag = true;
      }
    }
    return flag;
  }
}
