import { OkResponse, ErrorResponse } from '@libs/util';
import { ResponseCode } from '@config/global';

type AsyncMethod = (this: unknown, ...args: unknown[]) => Promise<unknown>;

type CacheClient = {
  get(key: string): Promise<unknown>;
  set(key: string, value: string, mode: string, ttl: number): Promise<unknown>;
  del(key: string): Promise<unknown>;
};

type WithCache = { cacheService?: CacheClient };

type CacheArgs = {
  cache_key?: string;
  del_cache_key?: string[];
  cache_mode?: string;
  cache_time?: number;
};

// 访问数据库，并缓存结果
export const SaveCache =
  (): MethodDecorator =>
  (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AsyncMethod;
    descriptor.value = async function (this: WithCache, ...args: unknown[]) {
      try {
        const result = await originalMethod.apply(this, args);
        const arg = args[0] as CacheArgs | undefined;
        if (arg && this.cacheService) {
          const { cache_key, del_cache_key } = arg;
          let { cache_mode, cache_time } = arg;
          if (del_cache_key) {
            for (const del_key of del_cache_key) {
              await this.cacheService.del(del_key);
            }
          }
          if (cache_key) {
            cache_mode = cache_mode || 'EX';
            cache_time = cache_time || Math.floor(Math.random() * 20);
            await this.cacheService.set(cache_key, JSON.stringify(result), cache_mode, cache_time);
          }
        }
        return OkResponse(result);
      } catch (error) {
        return ErrorResponse(ResponseCode.SYS_ERROR, error);
      }
    };
    return descriptor;
  };

// 先从缓存中获取，获取不到则访问数据库，并将结果缓存
export const UseCache =
  (): MethodDecorator =>
  (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AsyncMethod;
    descriptor.value = async function (this: WithCache, ...args: unknown[]) {
      try {
        const arg = args[0] as CacheArgs | undefined;
        if (!this.cacheService || !arg) {
          const result = await originalMethod.apply(this, args);
          return OkResponse(result);
        }

        const { cache_key, del_cache_key } = arg;
        let { cache_mode, cache_time } = arg;
        if (del_cache_key) {
          for (const del_key of del_cache_key) {
            await this.cacheService.del(del_key);
          }
        }
        if (!cache_key) {
          const result = await originalMethod.apply(this, args);
          return OkResponse(result);
        }
        const cached = await this.cacheService.get(cache_key);
        if (cached) {
          return OkResponse(JSON.parse(cached as string));
        }

        const result = await originalMethod.apply(this, args);
        cache_mode = cache_mode || 'EX';
        cache_time = cache_time || Math.floor(Math.random() * 20);
        await this.cacheService.set(cache_key, JSON.stringify(result), cache_mode, cache_time);
        return OkResponse(result);
      } catch (error) {
        return ErrorResponse(ResponseCode.SYS_ERROR, error);
      }
    };
    return descriptor;
  };

// 清除缓存，并访问数据库
export const ClearCache =
  (): MethodDecorator =>
  (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AsyncMethod;
    descriptor.value = async function (this: WithCache, ...args: unknown[]) {
      try {
        const arg = args[0] as CacheArgs | undefined;
        if (this.cacheService && arg) {
          const { del_cache_key } = arg;
          if (del_cache_key) {
            for (const del_key of del_cache_key) {
              await this.cacheService.del(del_key);
            }
          }
        }

        const result = await originalMethod.apply(this, args);
        return OkResponse(result);
      } catch (error) {
        return ErrorResponse(ResponseCode.SYS_ERROR, error);
      }
    };
    return descriptor;
  };
