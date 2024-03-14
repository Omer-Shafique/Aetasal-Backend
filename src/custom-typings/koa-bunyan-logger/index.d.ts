declare module 'koa-bunyan-logger' {
  import { Middleware } from 'koa';
  import * as Bunyan from 'bunyan';

  namespace koaBunyanLogger {
    interface IRequestIDContextOpts {
      header?: string;
      prop?: string;
      requestProp?: string;
      field?: string;
    }

    interface IRequestLoggerOpts {
      durationField?: string;
      levelFn?: (status: number, err: any) => Bunyan.LogLevel;
      updateLogFields?: (data: any) => void;
      updateRequestFields?: (data: any) => void;
      updateResponseFields?: (data: any) => void;
      formatRequestMessage?: (data: any) => string;
      formatResponseMessage?: (data: any) => string;
    }
    function requestIdContext(opts?: IRequestIDContextOpts): Middleware;
    function requestLogger(opts?: IRequestLoggerOpts): Middleware;
  }

  function koaBunyanLogger(logger?: Bunyan): Middleware;
  export = koaBunyanLogger;
}
