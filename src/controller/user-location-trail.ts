import { Context } from 'koa';
import * as userLocationTrailService from '../services/user-location-trail';

export const getAll = async (ctx: Context, next: () => void) => {
  const userId: number = ctx.request.query.userId;
  const startDate: Date = ctx.request.query.startDate;
  const endDate: Date = ctx.request.query.endDate;
  ctx.state.data = await userLocationTrailService.getAll(userId, startDate, endDate);
  await next();
};

export const saveUserLocationTrail = async (ctx: Context, next: () => void) => {
  const payload = ctx.request.body;
  ctx.state.data = await userLocationTrailService.saveOfficeLocation(payload);
  await next();
};
