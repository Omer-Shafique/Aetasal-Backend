import { Context } from 'koa';
import * as lookupService from '../services/lookup';
import * as lookupDataService from '../services/lookup-data';

export const getAll = async (ctx: Context, next: () => void) => {
  ctx.state.data = await lookupService.getAll();
  await next();
};

export const saveLookup = async (ctx: Context, next: () => void) => {
  const userId: string = ctx.state.user.userId;
  const payload = ctx.request.body;
  ctx.state.data = await lookupService.saveLookup(userId, payload);
  await next();
};

export const deleteLookup = async (ctx: Context, next: () => void) => {
  const id: number = +ctx.params.id;
  ctx.state.data = await lookupService.deleteLookup(id);
  await next();
};

export const findByLookupId = async (ctx: Context, next: () => void) => {
  const lookupId: number = +ctx.params.lookupId;
  ctx.state.data = await lookupDataService.findByLookupId(lookupId);
  await next();
};

export const findLookupDataById = async (ctx: Context, next: () => void) => {
  const lookupDataId: number = +ctx.params.lookupDataId;
  ctx.state.data = await lookupDataService.findLookupDataById(lookupDataId);
  await next();
};

export const saveLookupData = async (ctx: Context, next: () => void) => {
  const userId: string = ctx.state.user.userId;
  const lookupId: number = +ctx.params.lookupId;
  const payload = ctx.request.body;
  ctx.state.data = await lookupDataService.saveLookupData(userId, lookupId, payload);
  await next();
};

export const deleteLookupData = async (ctx: Context, next: () => void) => {
  const lookupId: number = +ctx.params.lookupId;
  const id: number = +ctx.params.id;
  ctx.state.data = await lookupDataService.deleteLookupData(lookupId, id);
  await next();
};
