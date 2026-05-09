import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import type { AuthConfig } from '@config/auth';
import { ValidationPipe } from '@pipe/validation.pipe';
import { ACTION_TYPE, TARGET_TYPE } from '@dto/EnumDTO';
import { OpLogService } from '@modules/oplog/oplog.service';

import { AuthService } from './auth.service';
import { LoginByAccountDto } from './dto/login-by-account.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthenticatedUser, JwtRefreshPayload } from './types/jwt-payload';

interface LoginResponse {
  user: Omit<AuthenticatedUser, 'sub'>;
  accessToken: string;
  refreshToken: string;
  refreshExpiresIn: number;
}

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly opLogService: OpLogService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '账号密码登录', description: '账号密码登录，返回 access + refresh' })
  @ApiBody({ description: '请求参数', type: LoginByAccountDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const tokens = await this.authService.signTokens(user);
    this.attachRefreshCookie(res, tokens.refreshToken, tokens.refreshExpiresIn);
    await this.opLogService.createLogTask({
      user_id: user.id,
      target_id: user.id,
      target_type: TARGET_TYPE.用户,
      action_user: user.account_id,
      action_type: ACTION_TYPE.登录,
      action_desc: '登录系统',
    });
    return {
      user: stripSub(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      refreshExpiresIn: tokens.refreshExpiresIn,
    };
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @ApiOperation({ summary: '刷新 access token', description: '使用 refresh token 重新签发' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request & { user?: JwtRefreshPayload },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string; refreshToken: string; refreshExpiresIn: number }> {
    const payload = req.user;
    if (!payload) {
      throw new Error('Refresh payload missing');
    }
    const tokens = await this.authService.refresh(payload);
    this.attachRefreshCookie(res, tokens.refreshToken, tokens.refreshExpiresIn);
    return tokens;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '退出登录', description: '清除 refresh cookie 并记录登出日志' })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: boolean }> {
    const auth = this.requireAuthConfig();
    res.clearCookie(auth.refreshCookie.name, {
      path: auth.refreshCookie.path,
      httpOnly: auth.refreshCookie.httpOnly,
      secure: auth.refreshCookie.secure,
      sameSite: auth.refreshCookie.sameSite,
    });
    if (user) {
      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user.id,
        target_type: TARGET_TYPE.用户,
        action_user: user.account_id,
        action_type: ACTION_TYPE.退出登录,
        action_desc: '退出系统',
      });
    }
    return { success: true };
  }

  @ApiOperation({ summary: '获取当前用户', description: '从 access token 解析当前用户信息' })
  @Get('me')
  me(@CurrentUser() user: AuthenticatedUser): Omit<AuthenticatedUser, 'sub'> {
    return stripSub(user);
  }

  private attachRefreshCookie(res: Response, token: string, ttlSeconds: number): void {
    const auth = this.requireAuthConfig();
    res.cookie(auth.refreshCookie.name, token, {
      httpOnly: auth.refreshCookie.httpOnly,
      secure: auth.refreshCookie.secure,
      sameSite: auth.refreshCookie.sameSite,
      path: auth.refreshCookie.path,
      maxAge: ttlSeconds * 1000,
    });
  }

  private requireAuthConfig(): AuthConfig {
    const auth = this.configService.get<AuthConfig>('auth');
    if (!auth) throw new Error('Auth config not loaded');
    return auth;
  }
}

function stripSub(user: AuthenticatedUser): Omit<AuthenticatedUser, 'sub'> {
  const { sub: _sub, ...rest } = user;
  return rest;
}
