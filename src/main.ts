import { NestFactory } from '@nestjs/core';
// import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { TransformInterceptor } from '@interceptor/transform.interceptor';
import { HttpExceptionFilter } from '@filter/http-exception.filter';
import { AllExceptionsFilter } from '@filter/any-exception.filter';
import { ValidationExceptionFilter } from '@filter/validation-exception-filter';
import { RedisLock } from '@libs/redlock';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import compression from 'compression';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import multer from 'multer';

bodyParserXml(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.use(function (req, res, next) {
    const headers = req.headers['content-type'];
    if (headers && headers.indexOf('utf8') > -1) {
      req.headers['content-type'] = headers.replace('utf8', 'utf-8');
    }
    next();
  });

  if (config.get('app.node_env') === 'production') {
    app.use(helmet());
  }
  app.enableCors({
    origin: true,
    allowedHeaders:
      'Content-Type, X-XSRF-Token, CSRF-Token, X-CSRF-Token, X-Auth-Token',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.use(compression());
  app.use(multer().any());
  app.use(bodyParser.json({ limit: '50mb' })); // For parsing application/json
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: false,
    }),
  ); // For parsing application/x-www-form-urlencoded
  app.use(
    bodyParser.xml({
      xmlParseOptions: {
        explicitArray: false, // 始终返回数组。默认情况下只有数组元素数量大于 1 是才返回数组。
      },
    }),
  );
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  const sessionRedis = createClient({
    socket: {
      host: config.get('redis.host'),
      port: config.get('redis.port'),
    },
    password: config.get('redis.password'),
    database: config.get('redis.cookie_db_index'),
  });
  await sessionRedis.connect();
  const redisStore = new RedisStore({
    client: sessionRedis,
  });
  app.use(
    session({
      store: redisStore,
      secret: config.get('session.secret'),
      key: config.get('session.key'),
      cookie: config.get('session.cookie'),
      resave: true,
      rolling: true,
      saveUninitialized: false,
    }),
  );
  RedisLock.init({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    password: config.get('redis.password'),
    db: config.get('redis.cache_db_index'),
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  // 配置 Swagger
  if (
    config.get('app.node_env') === 'development' ||
    config.get('app.node_env') === 'test'
  ) {
    const options = new DocumentBuilder()
      .addBearerAuth() // 开启 BearerAuth 授权认证
      .setTitle(config.get('app.name'))
      .setDescription(config.get('app.desc'))
      .setVersion(config.get('app.version'))
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);
  }
  // `Header`版本控制
  // app.enableVersioning({ type: VersioningType.HEADER, header: 'version' });
  await app.listen(config.get('app.port'));
  const buddhaArt = `
                 _oo0oo_
                o8888888o
                88" . "88
                (| -_- |)
                0\\  =  /0
              ___/'---'\\___
            .' \\|       |/ '.
           / \\|||  :  |||// \\
          / _||||| -:- |||||- \\
         |   | \\\  -  /// |   |
         | \\_|  ''\\---/''  |_/ |
         \\  .-\\__  '-'  ___/-. /
       ___'. .'  /--.--\\  '. .'___
    ."" '<  '.___\\_<|>_/___.' >' "".
   | | :  '- \\'.;'\\ _ /';.'/ - ' : | |
   \\  \\ '_.   \\_ __\\ /__ _/   .-' /  /
    '-._'.___  /__\\.-.\\__/__.- _.-'

        佛祖保佑  永无BUG  永不宕机
  `;
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(buddhaArt);
}
bootstrap();
