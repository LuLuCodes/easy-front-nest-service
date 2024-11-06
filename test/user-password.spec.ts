/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-06-09 15:02:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-11-06 09:22:37
 * @FilePath: /easy-front-nest-service/test/user-password.spec.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { encryptPassword } from '../src/libs/cryptogram';

describe('create user password', () => {
  it('create user password', async () => {
    const password = '1231231231321';
    const salt = '12';
    const encryptedPassword = encryptPassword(password, salt);
    console.log(`encryptedPassword: ${encryptedPassword}`);
  });
});
