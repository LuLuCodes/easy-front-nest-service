import type { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import multer from 'multer';

bodyParserXml(bodyParser);

export function applyBodyParsers(app: NestExpressApplication): void {
  app.use((req: any, _res: any, next: any) => {
    const ct = req.headers['content-type'];
    if (typeof ct === 'string' && ct.includes('utf8')) {
      req.headers['content-type'] = ct.replace('utf8', 'utf-8');
    }
    next();
  });

  app.use(compression());
  app.use(multer().any());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
  app.use(
    (bodyParser as any).xml({
      xmlParseOptions: { explicitArray: false },
    }),
  );
  app.use(cookieParser());
}
