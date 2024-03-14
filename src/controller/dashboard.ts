import { Context } from 'koa';
import * as dashboardService from '../services/dashboard';

export const getAdminDashboardStatistics = async (ctx: Context, next: () => void) => {
  ctx.state.data = await dashboardService.getAdminDashboardStatistics();
  await next();
};
