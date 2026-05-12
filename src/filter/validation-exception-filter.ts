import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { ResponseCode } from '@config/global';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let msg = exception.message;
    const inner = (exception as unknown as { response?: { message?: string | string[] } }).response;
    if (inner?.message) {
      msg = typeof inner.message === 'string' ? inner.message : inner.message[0];
    }
    const body = (request.body ?? {}) as Record<string, unknown>;
    const query = (request.query ?? {}) as Record<string, unknown>;
    const request_id = (body.request_id ?? query.request_id) as string | undefined;
    void response.status(200).send({
      code: ResponseCode.PARM_ERROR,
      request_id,
      msg,
    });
  }
}
