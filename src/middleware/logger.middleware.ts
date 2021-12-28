import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerFactory } from '@libs/log4js';

const logger = LoggerFactory.getInstance();
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    const code = res.statusCode;
    next();
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
    if (code >= 500) {
      logger.error(logFormat);
    } else if (code >= 400) {
      logger.warn(logFormat);
    } else {
      logger.log(logFormat);
    }
  }
}

// 函数式中间件
export function LoggerFunMiddleware(
  req: any,
  res: Response,
  next: () => any,
): void {
  const code = res.statusCode;
  next();
  // console.log(req);
  // req.parmas
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Session: ${JSON.stringify(req.session)}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(
      req.body,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  if (code >= 500) {
    logger.error(logFormat);
  } else if (code >= 400) {
    logger.warn(logFormat);
  } else {
    logger.log(logFormat);
  }
}
