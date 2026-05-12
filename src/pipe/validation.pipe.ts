import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface ValidationPipeOptions {
  transform?: boolean;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ValidationPipe.name);
  private readonly isTransformEnabled: boolean;

  constructor(options: ValidationPipeOptions = {}) {
    this.isTransformEnabled = !!options.transform;
  }

  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return this.isTransformEnabled ? this.transformPrimitive(value, metadata) : value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object as object);
    if (errors.length > 0) {
      const constraints = this.getConstraints(errors[0]);
      if (constraints) {
        const msg = Object.values(constraints)[0];
        this.logger.error(`Validation failed: ${msg}`);
        throw new BadRequestException(msg);
      } else {
        this.logger.error(`Validation failed: Validation failed`);
        throw new BadRequestException('Validation failed');
      }
    }
    if (this.isTransformEnabled) {
      return object;
    }
    return value;
  }

  private getConstraints(error: ValidationError): Record<string, string> | null {
    if (error.constraints) {
      return error.constraints;
    }
    for (const child of error.children ?? []) {
      const constraints = this.getConstraints(child);
      if (constraints) {
        return constraints;
      }
    }
    return null;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private transformPrimitive(value: unknown, metadata: ArgumentMetadata): unknown {
    if (!metadata.data) {
      return value;
    }
    const { type, metatype } = metadata;
    if (type !== 'param' && type !== 'query') {
      return value;
    }
    if (metatype === Boolean) {
      return value === true || value === 'true';
    }
    if (metatype === Number) {
      return Number(value);
    }
    return value;
  }
}
