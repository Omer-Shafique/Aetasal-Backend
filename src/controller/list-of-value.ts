import { Context } from 'koa';
import * as lovService from '../services/list-of-value';

export const findByKeys = async (ctx: Context, next: () => void) => {
  const key: string = ctx.request.query.keys;
  ctx.state.data = await lovService.findByKeys(key);
  await next();
};
