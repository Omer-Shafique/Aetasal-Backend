import { Middleware, Context } from 'koa'; 
import * as compose from 'koa-compose';
import * as Bunyan from 'bunyan';
import * as KoaBunyan from 'koa-bunyan-logger';
import * as Boom from 'boom';
import { mkdirSync, existsSync } from 'fs';
import { join as pathJoin } from 'path';
import * as util from 'util';

let globalLogger: Bunyan;

export class Logger {
  static error(_arg0: string, _err: any) {
    throw new Error('Method not implemented.');
  }
  public static koa(_logger: Bunyan): compose.ComposedMiddleware<Context> {
    // @ts-ignore
    const middleware: compose.ComposedMiddleware<Context> = compose([
      KoaBunyan.requestIdContext(),
      KoaBunyan.requestLogger({
        formatRequestMessage() {
          return util.format('Request %s %s', this.request.method, this.request.originalUrl);
        },
        formatResponseMessage(data: any) {
          return util.format(
            'Response (%d) %s %s in %sms',
            this.status,
            this.request.method,
            this.request.originalUrl,
            data.duration
          );
        },
      }),
    ]);
    return middleware;
  }

  private logDir: string;
  private name: string;
  private serializers: Bunyan.StdSerializers;
  private streams: Bunyan.Stream[];

  constructor(name?: string, dir?: string | null) {
    this.name = name || 'App';
    this.logDir = pathJoin(dir || __dirname + '/../../logs');
    this.serializers = Bunyan.stdSerializers;
    this.streams = [
      {
        level: 'debug',
        stream: process.stdout,
      },
      {
        level: 'debug',
        type: 'rotating-file',
        period: '1d',
        path: pathJoin(this.logDir, 'debug.json'),
      },
      {
        level: 'error',
        type: 'rotating-file',
        period: '1d',
        path: pathJoin(this.logDir, 'error.json'),
      },
    ];
  }

  public createLogger(fields?: any): Bunyan {
    if (globalLogger) {
      return globalLogger;
    }

    this.ensureDirectory();

    globalLogger = new Bunyan({
      name: this.name,
      serializers: this.serializers,
      streams: this.streams,
      ...fields,
    });

    globalLogger.addSerializers({
      // Add boom status code to the existing stdSerializer
      err(err: Boom) {
        const data: any = Bunyan.stdSerializers.err(err);

        if (err.isBoom) {
          data.status = err.output.statusCode;
        }

        return data;
      },
    });

    return globalLogger;
  }

  private ensureDirectory() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir);
    }
  }
}

export const getLoggerInstance = () => new Logger('betts-connect-api').createLogger();