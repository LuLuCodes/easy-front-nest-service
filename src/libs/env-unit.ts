/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-10-22 12:54:35
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2025-04-22 10:25:00
 * @FilePath: /easy-front-nest-service/src/libs/env-unit.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import * as dotenv from 'dotenv';
import * as path from 'path';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(__dirname, '../../src/.env') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

/**
 * 格式化环境变量
 * @param key 环境变量的键值
 * @param defaultValue 默认值
 * @param callback 格式化函数
 */
const fromatValue = <T>(
  key: string,
  defaultValue: T,
  callback: (value: string) => T,
): T => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined' || value === '') {
    return defaultValue;
  }
  return callback(value);
};

export const env = (key: string, defaultValue = ''): string =>
  fromatValue(key, defaultValue, (value) => value);

export const envNumber = (key: string, defaultValue = 0): number =>
  fromatValue(key, defaultValue, (value) => Number(value));

export const envBoolean = (key: string, defaultValue = false): boolean =>
  fromatValue(key, defaultValue, (value) => value === 'true');

export const envArray = (
  key: string,
  split = ',',
  defaultValue = [],
): string[] => fromatValue(key, defaultValue, (value) => value.split(split));
