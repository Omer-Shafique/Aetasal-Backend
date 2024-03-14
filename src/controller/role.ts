import { Context } from 'koa';
import * as roleService from '../services/role';

export const getAll = async (ctx: Context, next: () => void) => {
  ctx.state.data = await roleService.getAll();
  await next();
};

export const saveRole = async (ctx: Context, next: () => void) => {
  const payload = ctx.request.body;
  ctx.state.data = await roleService.saveRole(payload);
  await next();
};

export const deleteRole = async (ctx: Context, next: () => void) => {
  const id: number = +ctx.params.id;
  ctx.state.data = await roleService.deleteRole(id);
  await next();
};
