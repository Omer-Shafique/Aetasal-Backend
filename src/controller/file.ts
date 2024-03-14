import { Context } from 'koa';
import * as fileService from '../services/file';

export const saveProfilePicture = async (ctx: Context, next: () => void) => {
  const file = ctx.request.files && ctx.request.files.file;
  const userId = ctx.state.user.userId;
  ctx.state.data = await fileService.saveProfilePicture(userId, file);
  await next();
};

export const saveExecutionFile = async (ctx: Context, next: () => void) => {
  const file = ctx.request.files && ctx.request.files.file;
  const applicationId = ctx.request.body.applicationId;
  const formFieldId = ctx.request.body.formFieldId;
  ctx.state.data = await fileService.saveExecutionFile(`${applicationId}/${formFieldId}`, file);
  await next();
};
