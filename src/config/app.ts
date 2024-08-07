/*
 * @Author: leyi leyi@myun.info
 * @Date: 2021-11-25 17:08:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-08-07 18:21:15
 * @FilePath: /easy-front-nest-service/src/config/app.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { envBoolean, envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  node_env: env('NODE_ENV', 'development'),
  name: env('APP_NAME', 'easy-front-nest-service'),
  desc: env('APP_DESC', '基于nest的API Service'),
  version: env('APP_VERSION', '1.0.0'),
  port: envNumber('APP_PORT', 8000),
  use_log_queue: envBoolean('USE_LOG_QUEUE', false),
  throttle_ttl: envNumber('THROTTLE_TTL', 60000),
  throttle_limit: envNumber('THROTTLE_LIMIT', 60),
}));
