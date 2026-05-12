import { BadRequestException } from '@nestjs/common';
import { IsString, IsInt, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { ValidationPipe } from './validation.pipe';

class InnerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

class SampleDto {
  @IsString()
  @IsNotEmpty()
  account!: string;

  @IsInt()
  age!: number;

  @ValidateNested()
  @Type(() => InnerDto)
  inner?: InnerDto;
}

describe('ValidationPipe', () => {
  describe('class metadata', () => {
    it('returns the class instance when transform=true and validation passes', async () => {
      const pipe = new ValidationPipe({ transform: true });
      const value = { account: 'leyi', age: 30 };
      const out = (await pipe.transform(value, { metatype: SampleDto, type: 'body' })) as SampleDto;
      expect(out).toBeInstanceOf(SampleDto);
      expect(out.account).toBe('leyi');
    });

    it('returns the raw value when transform=false and validation passes', async () => {
      const pipe = new ValidationPipe({ transform: false });
      const value = { account: 'leyi', age: 30 };
      const out = await pipe.transform(value, { metatype: SampleDto, type: 'body' });
      expect(out).toBe(value);
    });

    it('throws BadRequestException for the first constraint message', async () => {
      const pipe = new ValidationPipe({ transform: true });
      await expect(
        pipe.transform({ account: '', age: 1 }, { metatype: SampleDto, type: 'body' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('drills into nested children to find a constraint', async () => {
      const pipe = new ValidationPipe({ transform: true });
      await expect(
        pipe.transform(
          { account: 'leyi', age: 30, inner: { name: '' } },
          { metatype: SampleDto, type: 'body' },
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('primitives', () => {
    it('passes through plain object query/param when there is no metatype', async () => {
      const pipe = new ValidationPipe({ transform: true });
      const value = { x: 1 };
      const out = await pipe.transform(value, { metatype: undefined, type: 'body' });
      expect(out).toBe(value);
    });

    it('coerces query string "true" to boolean true', async () => {
      const pipe = new ValidationPipe({ transform: true });
      const out = await pipe.transform('true', {
        type: 'query',
        data: 'active',
        metatype: Boolean,
      });
      expect(out).toBe(true);
    });

    it('coerces query string "42" to number 42', async () => {
      const pipe = new ValidationPipe({ transform: true });
      const out = await pipe.transform('42', {
        type: 'query',
        data: 'count',
        metatype: Number,
      });
      expect(out).toBe(42);
    });

    it('leaves primitives untouched for body type even with transform=true', async () => {
      const pipe = new ValidationPipe({ transform: true });
      const out = await pipe.transform('42', {
        type: 'body',
        data: 'count',
        metatype: Number,
      });
      expect(out).toBe('42');
    });
  });
});
