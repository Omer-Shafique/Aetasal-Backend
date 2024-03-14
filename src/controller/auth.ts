import { Context } from 'koa';
import * as boom from 'boom';
import { ILoginRequest, ISocialLoginRequest, ISignUpRequest } from '../interface/auth';
import { IResetPassword, IChangePassword } from './../interface/auth';
import * as authService from '../services/auth';
import * as config from '../config';

export const login = async (ctx: Context, next: () => void) => {
  const platform = ctx.header.platform;
  const appVersion = parseFloat(ctx.header.appversion);

  if (!platform || !appVersion) {
    throw boom.forbidden('Newer version of application is available please contact administrator');
  } else if (platform === 'android' && config.default.appVersion > appVersion) {
    throw boom.forbidden('Newer version of application is available please contact administrator');
  }

  const payload: ILoginRequest = ctx.request.body;
  ctx.state.data = await authService.login(payload);
  await next();
};

export const signUp = async (ctx: Context, next: () => void) => {
  const payload: ISignUpRequest = ctx.request.body;
  ctx.state.data = await authService.signUp(payload);
  await next();
};

// export const socialLoginOrSignUp = async (ctx: Context, next: () => void) => {
//   const payload: ISocialLoginRequest = ctx.request.body;
//   ctx.state.data = await authService.socialLoginOrSignup(payload);
//   await next();
// };

export const forgotPassword = async (ctx: Context, next: () => void) => {
  const email: string = ctx.request.body.email;
  ctx.state.data = await authService.forgotPassword(email);
  await next();
};

export const verifyHash = async (ctx: Context, next: () => void) => {
  const email: string = ctx.request.body.email;
  const hash: string = ctx.request.body.hash;
  const verifyEmail: boolean = ctx.request.body.verifyEmail || false;
  ctx.state.data = await authService.verifyHash(email, hash);
  await next();
};

export const resetPassword = async (ctx: Context, next: () => void) => {
  const payload: IResetPassword = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    hash: ctx.request.body.hash
  };
  ctx.state.data = await authService.resetPassword(payload);
  await next();
};

export const changePassword = async (ctx: Context, next: () => void) => {
  const payload: IChangePassword = {
    oldPassword: ctx.request.body.oldPassword,
    newPassword: ctx.request.body.newPassword,
  };
  const userId: string = ctx.state.user.userId;
  ctx.state.data = await authService.changePassword(userId, payload);
  await next();
};
