import { Context } from 'koa';
import * as reportService from '../services/report';
import { ITimeApplicationReport } from '../interface/application';

export const getMyItemReport = async (ctx: Context, next: () => void) => {
  const user: string = ctx.state.user;
  ctx.state.data = await reportService.getMyItemReport(user);
  await next();
};

export const getUserWorkloadReport = async (ctx: Context, next: () => void) => {
  const userId: string = ctx.params.userId;
  ctx.state.data = await reportService.getUserWorkloadReport(userId);
  await next();
};

export const getApplicationExecutionTimeReport = async (ctx: Context, next: () => void) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate,
    endDate: ctx.query.endDate
  };
  ctx.state.data = await reportService.getApplicationExecutionTimeReport(payload);
  await next();
};

export const getTotalExecutionsCountReport = async (ctx: Context, next: () => void) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate,
    endDate: ctx.query.endDate
  };
  ctx.state.data = await reportService.getTotalExecutionsCountReport(payload);
  await next();
};

export const getTotalExecutionsCountGraph = async (ctx: Context, next: () => void) => {
    const user: string = ctx.state.user;
    const payload: ITimeApplicationReport = {
      applicationId: ctx.params.applicationId,
      startDate: ctx.query.startDate,
      endDate: ctx.query.endDate
    };
    ctx.state.data = await reportService.getTotalExecutionsCountGraph(payload);
    await next();
};

export const getApplicationExecutionLocationReport = async (ctx: Context, next: () => void) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate,
    endDate: ctx.query.endDate
  };
  ctx.state.data = await reportService.getApplicationExecutionLocationReport(payload);
  await next();
};
