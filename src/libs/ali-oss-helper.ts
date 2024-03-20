/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-03-20 14:36:32
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-03-20 19:52:43
 * @FilePath: /easy-front-nest-service/src/libs/ali-oss-helper.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import * as crypto from 'crypto-js';

export default class AliOssHelper {
  private _access_key_id = '';
  private _access_key_secret = '';
  private _time_out = 0.5;
  private _max_size = 0;
  constructor({
    access_key_id,
    access_key_secret,
    max_size,
  }: {
    access_key_id: string;
    access_key_secret: string;
    max_size?: number;
  }) {
    this._access_key_id = access_key_id;
    this._access_key_secret = access_key_secret;
    this._max_size = max_size || 0.5;
  }

  createUploadParams() {
    const policy = this.getPolicyBase64();
    const signature = this.signature(policy);
    return {
      access_key_id: this._access_key_id,
      policy: policy,
      signature: signature,
    };
  }

  private getPolicyBase64() {
    const date = new Date();
    // 设置policy过期时间。
    date.setHours(date.getHours() + this._time_out);
    const srcT = date.toISOString();
    const policyText = {
      expiration: srcT,
      conditions: [
        // 限制上传文件大小。
        ['content-length-range', 0, this._max_size * 1024 * 1024],
      ],
    };
    const buffer = Buffer.from(JSON.stringify(policyText));
    return buffer.toString('base64');
  }

  signature(policy) {
    return crypto.enc.Base64.stringify(
      crypto.HmacSHA1(policy, this._access_key_secret),
    );
  }
}
