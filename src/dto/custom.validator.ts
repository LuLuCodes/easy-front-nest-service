import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCustomDateString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCustomDateString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // 使用正则表达式匹配 'YYYY-MM-DD HH:mm:ss' 格式
          const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
          if (!dateTimeRegex.test(value)) {
            return false;
          }

          // 将字符串转换为 Date 对象并验证是否为有效日期
          const date = new Date(value.replace(' ', 'T')); // 将空格替换为'T'以符合ISO 8601格式
          return !isNaN(date.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date string in the format 'YYYY-MM-DD HH:mm:ss'`;
        },
      },
    });
  };
}
