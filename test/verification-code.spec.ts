/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-12-02 10:34:37
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-12-02 10:37:07
 * @FilePath: /easy-front-nest-service/test/verification-code.spec.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { VerificationCodeGenerator } from '@libs/verification-code-generator';

describe('test verification code generator', () => {
  it('test generate and verify', async () => {
    const code_generator = new VerificationCodeGenerator({
      length: 8,
      seed: Date.now(),
    });
    const custom_code = code_generator.generate();
    console.log('Custom (8-digit) code:', custom_code);
    console.log('Custom code valid:', code_generator.verify(custom_code));
  });
});
