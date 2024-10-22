/*
 * @Author: leyi leyi@myun.info
 * @Date: 2021-11-25 17:08:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-10-22 15:38:57
 * @FilePath: /easy-front-nest-service/src/config/oss.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('oss', () => {
  const internal = envNumber('INTERNAL', 0) === 1;
  let end_point = env('END_POINT', '');
  const region = env('REGION_ID', '');
  end_point = internal
    ? end_point.replace(region, `${region}-internal`)
    : end_point;
  return {
    end_point,
    access_key_id: env('ACCESS_KEY_ID', ''),
    access_key_secret: env('ACCESS_KEY_SECRET', ''),
    bucket_name: env('BUCKET_NAME', ''),
    region_id: env('REGION_ID', ''),
    internal,
    timeout: env('TIMEOUT', '60s'),
    domain: env('DOMAIN', ''),
  };
});
