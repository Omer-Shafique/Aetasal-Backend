import * as Koa from 'koa';
import * as Bunyan from 'bunyan';

import { IJwtToken } from '../../interface/jwt-token';
import { IPaginationOpts } from '../../interface/request';
import { IResponse } from '../../interface/response';

declare module 'koa' {
  // tslint:disable-next-line:interface-name
  interface Context {
    log: Bunyan;
    preresponse: IResponse;
    token: IJwtToken;
    accessToken: string;
    pagination: IPaginationOpts;
  }

  // tslint:disable-next-line:interface-name
  interface Request {
    body?: any;
  }
}
