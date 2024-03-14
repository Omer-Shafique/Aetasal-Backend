import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import * as compose from 'koa-compose';
import { IResponse } from '../interface/response';

const handler = async (ctx: Context, next: () => void) => {
  if (ctx.state.data) {
    ctx.body = {} as IResponse;
    ctx.body = {
      meta: {
        status: ctx.status,
        message: ctx.state.message || 'success',
      },
      data: ctx.state.data,
    };
    if (ctx.pagination && ctx.method === 'GET') {
      ctx.body.meta.limit = ctx.pagination.limit;
      ctx.body.meta.offset = ctx.pagination.offset;
      ctx.body.meta.totalCount = ctx.pagination.totalCount;
    }
  } else {
    ctx.type = 'html';
    const toSend = path.join(__dirname, '../../web/index.html');
    ctx.body = fs.createReadStream(toSend);
  }

  await next();
};

export default () => compose([handler]);
