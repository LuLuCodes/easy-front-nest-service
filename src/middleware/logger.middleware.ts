import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: any, res: any, next: NextFunction): void {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];

    res.write = function (...restArgs: any[]) {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const data = Buffer.concat(chunks).toString('utf8');

      oldEnd.apply(res, restArgs);

      const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        time: ${Date.now()},
        fromIP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip},
        method: ${req.method},
        originalUri: ${req.originalUrl},
        session: ${JSON.stringify(req.session)},
        requestParmas: ${JSON.stringify(req.params)},
        requestQuery: ${JSON.stringify(req.query)},
        requestBody: ${JSON.stringify(req.body)},
        statusCode: ${res.statusCode},
        responseData: ${JSON.stringify(data)},
        referer: ${req.headers.referer || ''},
        ua: ${req.headers['user-agent']}, \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      `;

      if (res.statusCode >= 500) {
        this.logger.error(logFormat);
      } else if (res.statusCode >= 400) {
        this.logger.warn(logFormat);
      } else {
        this.logger.log(logFormat);
      }
    };

    next();
  }
}
