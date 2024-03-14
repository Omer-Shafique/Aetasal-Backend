import { Context } from 'koa';
import * as groupService from '../services/group';

export const getAll = async (ctx: Context, next: () => void) => {
  ctx.state.data = await groupService.getAll();
  await next();
};

export const saveGroup = async (ctx: Context, next: () => void) => {
  const payload = ctx.request.body;
  ctx.state.data = await groupService.saveGroup(payload);
  await next();
};

export const deleteGroup = async (ctx: Context, next: () => void) => {
  const id: number = +ctx.params.id;
  ctx.state.data = await groupService.deleteGroup(id);
  await next();
};
