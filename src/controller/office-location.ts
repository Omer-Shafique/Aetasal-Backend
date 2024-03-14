import { Context } from 'koa';
import * as officeLocationService from '../services/office-location';

export const getAll = async (ctx: Context, next: () => void) => {
  ctx.state.data = await officeLocationService.getAll();
  await next();
};

export const saveOfficeLocation = async (ctx: Context, next: () => void) => {
  const payload = ctx.request.body;
  ctx.state.data = await officeLocationService.saveOfficeLocation(payload);
  await next();
};

export const deleteOfficeLocation = async (ctx: Context, next: () => void) => {
  const id: number = +ctx.params.id;
  ctx.state.data = await officeLocationService.deleteOfficeLocation(id);
  await next();
};
