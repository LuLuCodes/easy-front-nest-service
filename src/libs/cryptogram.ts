import * as crypto from 'crypto';
import * as cryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Make uuid
 */
export function uuid(replace = true): string {
  const uuid = uuidv4();
  return replace ? uuid.replace(/-/gi, '') : uuid;
}

/**
 * Make salt
 */
export function makeSalt(len: number): string {
  return crypto.randomBytes(len).toString('base64');
}

/**
 * checkSign
 * @param password 密码
 * @param salt 密码盐
 */
export function checkSign(sign: string, body: string, url: string): boolean {
  const aes_sign = cryptoJS.AES.decrypt(sign, url);
  const temp_sign = aes_sign.toString(cryptoJS.enc.Utf8);
  const m5_sign = crypto.createHash('md5').update(body, 'utf8').digest('hex');
  return temp_sign === m5_sign;
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 64代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 64, 'sm3').toString('base64')
  );
}

/**
 * 密码强度检查结果
 */
export interface IPasswordStrengthResult {
  is_valid: boolean; // 密码是否有效
  score: number; // 密码强度分数 (0-100)
  strength: string; // 强度级别 ('弱', '中等', '强', '非常强')
  issues: string[]; // 密码存在的问题列表
  suggestions: string[]; // 改进建议
}

/**
 * 检查密码强度
 * @param password 待检查的密码
 * @param min_length 最小长度要求 (默认8)
 * @returns 密码强度检查结果
 */
export function checkPasswordStrength(
  password: string,
  min_length: number = 8,
): IPasswordStrengthResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // 基础检查
  if (!password) {
    issues.push('密码不能为空');
    return {
      is_valid: false,
      score: 0,
      strength: '弱',
      issues,
      suggestions: ['请输入密码'],
    };
  }

  // 长度检查 - 作为强制项
  if (password.length < min_length) {
    issues.push(`密码长度不足 ${min_length} 个字符`);
    suggestions.push(`密码至少需要 ${min_length} 个字符`);
    // 长度不足，直接返回无效结果
    return {
      is_valid: false,
      score: Math.min(30, password.length * 3), // 给出一些基于当前长度的分数
      strength: '弱',
      issues,
      suggestions,
    };
  } else {
    score += 10; // 基础分
    // 额外长度加分
    score += Math.min(20, (password.length - min_length) * 2);
  }

  // 字符多样性检查
  const has_lower_case = /[a-z]/.test(password);
  const has_upper_case = /[A-Z]/.test(password);
  const has_numbers = /[0-9]/.test(password);
  const has_special_chars = /[^A-Za-z0-9]/.test(password);

  if (!has_lower_case) {
    issues.push('缺少小写字母');
    suggestions.push('添加小写字母可以增强密码强度');
  } else {
    score += 10;
  }

  if (!has_upper_case) {
    issues.push('缺少大写字母');
    suggestions.push('添加大写字母可以增强密码强度');
  } else {
    score += 10;
  }

  if (!has_numbers) {
    issues.push('缺少数字');
    suggestions.push('添加数字可以增强密码强度');
  } else {
    score += 10;
  }

  if (!has_special_chars) {
    issues.push('缺少特殊字符');
    suggestions.push('添加特殊字符（如 !@#$%^&*）可以显著增强密码强度');
  } else {
    score += 15;
  }

  // 检查常见弱密码
  if (
    /^(123456|password|qwerty|admin|welcome|12345678|123123|111111|1234567890|password123)$/i.test(
      password,
    )
  ) {
    issues.push('使用了常见的弱密码');
    suggestions.push('避免使用常见的弱密码');
    score = 0;
  }

  // 连续字符检查
  if (
    /(?:abcdef|bcdefg|cdefgh|defghi|efghij|fghijk|ghijkl|hijklm|ijklmn|jklmno|klmnop|lmnopq|mnopqr|nopqrs|opqrst|pqrstu|qrstuv|rstuvw|stuvwx|tuvwxy|uvwxyz|012345|123456|234567|345678|456789)/i.test(
      password,
    )
  ) {
    issues.push('包含连续的字母或数字');
    suggestions.push('避免使用连续的字母或数字');
    score -= 10;
  }

  // 确保分数在0-100范围内
  score = Math.max(0, Math.min(100, score));

  // 确定强度级别
  let strength: string;
  if (score < 40) {
    strength = '弱';
  } else if (score < 60) {
    strength = '中等';
  } else if (score < 80) {
    strength = '强';
  } else {
    strength = '非常强';
  }

  // 确定密码是否有效（至少达到中等强度）
  // 注意：这里不再检查长度，因为长度检查已经作为前置条件
  const is_valid = score >= 50;

  // 如果没有问题，添加一个积极反馈
  if (issues.length === 0) {
    suggestions.push('您的密码很强大，非常好！');
  }

  return {
    is_valid,
    score,
    strength,
    issues,
    suggestions,
  };
}

/**
 * AES-128-CBC 加密方法
 * @param key  加密key
 * @param iv   向量
 * @param data 需要加密的数据
 */
export function aes128cbcEncrypt(
  key: Buffer,
  iv: Buffer,
  data: string,
): string {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return crypted;
}

/**
 * AES-128-CBC     解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 */
export function aes128cbcDecrypt(
  key: Buffer,
  iv: Buffer,
  crypted: string,
): string {
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  // 设置自动 padding 为 true，删除填充补位
  decipher.setAutoPadding(true);
  let decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

/**
 * AES-256-ECB 加密方法
 * @param key  加密key
 * @param iv   向量
 * @param data 需要加密的数据
 */
export function aes256ecbEncrypt(
  key: Buffer,
  iv: Buffer,
  data: string,
): string {
  const cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return crypted;
}

/**
 * AES-256-ECB     解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 */
export function aes256ecbDecrypt(
  key: Buffer,
  iv: Buffer,
  crypted: string,
): string {
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
  // 设置自动 padding 为 true，删除填充补位
  decipher.setAutoPadding(true);
  let decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

/**
 * hmacsha256 加密
 * @param data
 * @param key
 */
export function hmacsha256(data: string, key: string): string {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest('hex');
}

export function md5(data: string): string {
  return hash(data, 'md5');
}

export function sha1(data: string): string {
  return hash(data, 'sha1');
}
export function hash(data: string, algorithm: string): string {
  return crypto.createHash(algorithm).update(data, 'utf8').digest('hex');
}

export function hashx(data: crypto.BinaryLike, algorithm: string): string {
  return crypto.createHash(algorithm).update(data).digest('hex');
}

/**
 * SHA256withRSA
 * @param data 待加密字符
 * @param privatekey 私钥key
 */
export function sha256WithRsa(data: string, privatekey: Buffer): string {
  return crypto
    .createSign('RSA-SHA256')
    .update(data)
    .sign(privatekey, 'base64');
}

/**
 * SHA256withRSA 验证签名
 * @param publicKey 公钥key
 * @param signature 待验证的签名串
 * @param data 需要验证的字符串
 */
export function sha256WithRsaVerify(
  publicKey: Buffer,
  signature: string,
  data: string,
): boolean {
  return crypto
    .createVerify('RSA-SHA256')
    .update(data)
    .verify(publicKey, signature, 'base64');
}

/**
 * AEAD_AES_256_GCM 解密
 * @param key
 * @param nonce
 * @param associatedData
 * @param ciphertext
 */
export function aes256gcmDecrypt(
  key: string,
  nonce: string,
  associatedData: string,
  ciphertext: string,
): string {
  const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
  const authTag = ciphertextBuffer.slice(ciphertextBuffer.length - 16);
  const data = ciphertextBuffer.slice(0, ciphertextBuffer.length - 16);
  const decipherIv = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  decipherIv.setAuthTag(Buffer.from(authTag));
  decipherIv.setAAD(Buffer.from(associatedData));
  const decryptStr = decipherIv.update(data, null, 'utf8');
  decipherIv.final();
  return decryptStr;
}

/**
 * api接口加密
 * @param data 返回值
 * @param key 加密的key
 * @returns 加密文本
 */
export function apiCipher(data: any, key: string): string {
  if (data == null) {
    return data;
  }
  return cryptoJS.AES.encrypt(
    typeof data === 'object' ? JSON.stringify(data) : data.toString(),
    key,
  ).toString();
}
