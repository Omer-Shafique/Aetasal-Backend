import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import compose from 'koa-compose';
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
    // @ts-ignore
    if (ctx.pagination && ctx.method === 'GET') {
      // @ts-ignore
      ctx.body.meta.limit = ctx.pagination.limit;
      // @ts-ignore
      ctx.body.meta.offset = ctx.pagination.offset;
      // @ts-ignore
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
