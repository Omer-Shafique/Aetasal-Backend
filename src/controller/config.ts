import { Context } from 'koa';
import * as configService from '../services/config';

export const getConfig = async (ctx: Context, next: () => void) => {
  ctx.state.data = await configService.getConfig();
  await next();
};
