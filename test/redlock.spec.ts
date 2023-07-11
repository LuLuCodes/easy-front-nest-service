/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-07-11 11:37:25
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-07-11 12:57:39
 * @FilePath: /easy-front-nest-service/test/redlock.spec.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { RedisLock } from '../src/libs/redlock';

describe('redlock test', () => {
  it('redlock using', async () => {
    const config = {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 1,
    };

    RedisLock.init(config);

    // 这个函数抛出一个错误
    async function taskThatThrows(lock) {
      // throw new Error('An error occurred');
      // await RedisLock.extend(lock, 5000);
      return 1;
    }

    // 尝试执行taskThatThrows，如果函数抛出错误，错误会被捕获并重新抛出
    const res = await RedisLock.using(
      'resource-key',
      1000,
      taskThatThrows,
    ).catch((error) =>
      console.log('Failed to execute taskThatThrows:', error.message),
    );
    console.log(res);
  }, 10000);
});
