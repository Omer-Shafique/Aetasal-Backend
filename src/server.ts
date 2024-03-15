import * as Bunyan from 'bunyan';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as cors from 'koa2-cors';
import * as dotenv from 'dotenv'; 

import config from './config/index';
import pagination from './middleware/pagination';
import errorMiddleware from './middleware/error';
import response from './middleware/response';
import routes from './route/index';
import { Logger } from './utils/logger';
import compose = require('koa-compose');
import { clear } from 'console';

// Load environment variables from .env file
dotenv.config();

const whitelist = [
  'http://localhost:4200',
  'http://localhost:3000',
  'http://localhost',
  'http://localhost:8100',
  'http://54.146.103.85:3000',
  'http://54.146.103.85:3000/upload',
  'http://54.146.103.85:3000/api',
  'http://54.146.103.85',
  'https://workable.aetasaal.com'
];

function checkOriginAgainstWhitelist(ctx: Koa.Context) {
  const requestOrigin = ctx.request.headers.origin || ctx.request.origin;
  if (!whitelist.includes(requestOrigin)) {
    return ctx.throw(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
}

export async function startServer(log: Bunyan) {
  const app = new Koa();

  app.use(Logger.koa(log));

  // Set cache control headers manually
  app.use(async (ctx, next) => {
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    await next();
  });

  // @ts-ignore
  app.use(cors({ origin: checkOriginAgainstWhitelist }));

  // @ts-ignore
  app.use(koaBody({ jsonLimit: '10mb', formLimit: '50mb', multipart: true, json: true }));

  app.use(pagination);

  // Static files (images)
  const uploads = new Koa();
  // @ts-ignore
  uploads.use(serve(__dirname + '/../upload/'));
  // @ts-ignore
  app.use(mount('/', uploads));

  app.use(errorMiddleware());

  // Database configuration
  const dbConfig = {
    // your database configuration
  };

  // Registers routes
  app.use(routes());
  app.use(response());

  return new Promise<void>((resolve, reject) => {
    const p = process.env.PORT || config.server.port;
    app.listen(p, () => {
      log.info('server started on port %d with env=%s', p, config.env);
      resolve();
    });

    app.on('error', err => {
      reject(err);
    });
  });
}