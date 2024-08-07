/*
 * @Author: leyi leyi@myun.info
 * @Date: 2021-11-25 17:08:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-08-07 18:21:51
 * @FilePath: /easy-front-nest-service/src/config/redis.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: env('REDIS_HOST', '127.0.0.1'),
  port: envNumber('REDIS_PORT', 6379),
  password: env('REDIS_PASSWORD', ''),
  cache_db_index: envNumber('CACHE_REDIS_DB_INDEX', 0),
  cookie_db_index: envNumber('COOKIE_REDIS_DB_INDEX', 1),
  throttler_store_db_index: envNumber('THROTTLER_STORE_DB_INDEX', 13),
  queue_db_index: envNumber('QUEUE_REDIS_DB_INDEX', 14),
}));
