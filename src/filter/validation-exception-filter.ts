/*
 * @Author: leyi leyi@myun.info
 * @Date: 2021-11-25 17:08:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-07-19 11:16:34
 * @FilePath: /easy-front-nest-service/src/filter/validation-exception-filter.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

import { ResponseCode } from '@config/global';

import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    const request = ctx.getRequest();

    let msg = exception.message;
    if (exception.response && exception.response.message) {
      if (typeof exception.response.message === 'string') {
        msg = exception.response.message;
      } else if (exception.response.message.length) {
        msg = exception.response.message[0];
      }
    }
    response.status(200).json({
      code: ResponseCode.PARM_ERROR,
      request_id: request.body.request_id || request.query.request_id,
      msg,
    });
  }
}
