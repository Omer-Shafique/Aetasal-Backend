import * as Bunyan from 'bunyan';
import Koa from 'koa';
import koaBody from 'koa-body';
import * as helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import cors from 'koa2-cors';
import * as dotenv from 'dotenv';
import koaBunyanLogger from 'koa-bunyan-logger';
import config from './config/index';
import pagination from './middleware/pagination';
import errorMiddleware from './middleware/error';
import response from './middleware/response';
import routes from './route/index';
import { Logger } from './utils/logger';
import compose = require('koa-compose');

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

function checkOriginAgainstWhitelist(ctx: Koa.Context): string {
  const requestOrigin = ctx.request.headers.origin || ctx.request.origin;
  if (!whitelist.includes(requestOrigin)) {
    throw new Error(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
}

export async function startServer(log: Bunyan): Promise<void> {
  const app = new Koa();

  app.use(koaBunyanLogger(log));

  app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    await next();
  });

  app.use(cors({ origin: checkOriginAgainstWhitelist }));

  app.use(koaBody({ jsonLimit: '10mb', formLimit: '50mb', multipart: true, json: true }));

  app.use(pagination);

  const uploads = new Koa();
  uploads.use(serve(__dirname + '/../upload/'));
  app.use(mount('/', uploads));

  app.use(errorMiddleware());

  app.use(routes());
  app.use(response());

  const p = process.env.PORT || config.server.port;
  app.listen(p, () => {
    log.info('server started on port %d with env=%s', p, config.env);
  });
}