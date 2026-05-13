import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { OtherErrorResponse } from '@libs/util';
import { ResponseCode } from '@config/global';
import { BusinessException } from '@common/exceptions/business-exception';

@Catch()
export class OtherExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(OtherExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;
    this.logger.error(
      ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.url}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `,
    );

    const body = (request.body ?? {}) as Record<string, unknown>;
    const query = (request.query ?? {}) as Record<string, unknown>;
    const request_id = (body.request_id ?? query.request_id) as string | undefined;
    const trace_id = trace.getActiveSpan()?.spanContext().traceId;
    const code = exception instanceof BusinessException ? exception.code : ResponseCode.SYS_ERROR;
    const errorResponse = OtherErrorResponse(code, message);
    void response
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ ...errorResponse, code, request_id, trace_id });
  }
}
