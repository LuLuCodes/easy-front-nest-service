import { OkResponse, ErrorResponse } from '@libs/util';
import { ResponseCode } from '@config/global';

type AsyncMethod = (this: unknown, ...args: unknown[]) => Promise<unknown>;

export const CatchError =
  (): MethodDecorator =>
  (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as AsyncMethod;
    descriptor.value = async function (this: unknown, ...args: unknown[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return OkResponse(result);
      } catch (error) {
        return ErrorResponse(ResponseCode.SYS_ERROR, error);
      }
    };
    return descriptor;
  };
