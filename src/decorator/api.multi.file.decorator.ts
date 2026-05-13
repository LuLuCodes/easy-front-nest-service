import { ApiBody } from '@nestjs/swagger';
import type {
  SchemaObject,
  ReferenceObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

type SchemaProps = Record<string, SchemaObject | ReferenceObject>;

export const ApiMultiFile =
  (params: SchemaProps = {}, fileName = 'files'): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          ...params,
        },
      },
    })(target, propertyKey, descriptor);
  };
