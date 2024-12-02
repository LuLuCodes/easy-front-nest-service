/**
 * 数字验证码生成器
 * 用于生成可验证的N位数字码，适用于优惠券、激活码、兑换码等场景
 * - 支持自定义长度（最小3位，包含1位校验位）
 * - 使用1-9的数字，最后一位为校验位
 * - 使用加权算法计算校验位
 * - 使用种子来确保生成的唯一性和可重现性
 */

export class VerificationCodeGenerator {
  private seed: number;
  private length: number;
  private readonly MIN_LENGTH = 3; // 最小长度：2位有效数字 + 1位校验位

  constructor(
    options: {
      seed?: number;
      length?: number;
    } = {},
  ) {
    this.seed = options.seed || Date.now();

    // 确保长度至少为最小长度
    const requestedLength = options.length || 8;
    if (requestedLength < this.MIN_LENGTH) {
      throw new Error(`Length must be at least ${this.MIN_LENGTH}`);
    }
    this.length = requestedLength;
  }

  /**
   * 生成一个新的验证码
   */
  generate(): string {
    // 生成有效数字（总长度减去1位校验位）
    const digits: number[] = this.generateRandomDigits(this.length - 1);

    // 计算并添加校验位
    const checkDigit = this.calculateCheckDigit(digits);
    digits.push(checkDigit);

    return digits.join('');
  }

  /**
   * 验证码是否有效
   */
  verify(code: string): boolean {
    // 基础格式验证
    if (!this.isValidFormat(code)) {
      return false;
    }

    const digits = code.split('').map(Number);
    const providedCheck = digits.pop()!;
    const calculatedCheck = this.calculateCheckDigit(digits);

    return providedCheck === calculatedCheck;
  }

  /**
   * 生成指定数量的随机数字
   */
  private generateRandomDigits(length: number): number[] {
    const digits: number[] = [];

    for (let i = 0; i < length; i++) {
      // 使用线性同余生成器来生成伪随机数
      this.seed = (1103515245 * this.seed + 12345) % 2147483647;
      // 映射到1-9范围
      const digit = (this.seed % 9) + 1;
      digits.push(digit);
    }

    return digits;
  }

  /**
   * 计算校验位
   * 使用动态权重的校验算法
   */
  private calculateCheckDigit(digits: number[]): number {
    let sum = 0;

    // 根据实际长度动态生成权重数组
    // 使用质数作为权重以增加校验的可靠性
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const weights = primes.slice(0, digits.length);

    // 计算加权和
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * weights[i];
    }

    // 计算校验位 (确保结果在1-9范围内)
    const checkDigit = (sum % 9) + 1;

    return checkDigit;
  }

  /**
   * 验证码格式是否正确
   */
  private isValidFormat(code: string): boolean {
    // 验证长度
    if (code.length !== this.length) {
      return false;
    }

    // 验证是否都是1-9的数字
    return /^[1-9]+$/.test(code);
  }
}
