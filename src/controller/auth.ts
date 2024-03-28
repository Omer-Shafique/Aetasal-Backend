// import { Context } from 'koa';
// import * as jwt from 'jsonwebtoken';
// import * as boom from 'boom';
// import { IUserAttributes } from '../models/user';
// import * as authService from '../services/auth';
// import { IChangePassword, IResetPassword, ISignUpRequest } from '../interface/auth';

// const DEFAULT_EMAIL = 'omershafiq@katib.pk';
// const DEFAULT_PASSWORD = 'apples';
// const JWT_SECRET = '490321cb94e7032a5b53e98050b63f65001c401fa6e024ab0dd9bd73e77529d7'; 

// export const login = async (ctx: Context, next: () => Promise<any>) => {
//   const { email, password } = ctx.request.body;

//   // Check if provided credentials match the default credentials
//   if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
//     // Create a user object with all properties
//     const user: IUserAttributes = {
//       id: '1', // Assign an appropriate ID
//       firstName: 'Omer',
//       lastName: 'Shafiq',
//       email: DEFAULT_EMAIL,
//       isEmailVerified: true, 
//       password: DEFAULT_PASSWORD,
//       contactNo: "03302085537",
//       pictureUrl: '',
//       gender: 'male',
//       managerId: '1',
//       departmentId: 1,
//       officeLocationId: 1,
//       timezone: '',
//       isApproved: true, 
//       isActive: true, 
//       deviceId: '1',
//       createdAt: new Date(),
//       deletedBy: '',
//       //@ts-ignore
//       deletedAt: undefined, // Assuming user is not deleted
//       userRoles: []
//     };

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' }); // Adjust expiry time as needed

//     // Return authentication token along with user data
//     ctx.state.data = { token, message: 'Login successful', user };
//   } else {
//     // Return error if credentials do not match
//     throw boom.unauthorized('Incorrect email or password');
//   }

//   await next();
// };

import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import * as boom from 'boom';
import { IUserAttributes } from '../models/user';
import * as authService from '../services/auth';
import { IChangePassword, IResetPassword, ISignUpRequest } from '../interface/auth';

// Define your default email, password, and JWT secret
const DEFAULT_EMAIL = 'omershafiq@katib.pk';
const DEFAULT_PASSWORD = 'apples';
const JWT_SECRET = '490321cb94e7032a5b53e98050b63f65001c401fa6e024ab0dd9bd73e77529d7'; 

// Login function
export const login = async (ctx: Context, next: () => Promise<any>) => {
  const { email, password } = ctx.request.body;

  try {
    // Your authentication logic goes here
    // For example, check credentials against database or any other authentication method

    // If authentication is successful, generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // Adjust expiry time as needed

    // Return authentication token
    ctx.state.data = { token, message: 'Login successful' };
  } catch (error) {
    // Return error message if authentication fails
    throw boom.unauthorized('Incorrect email or password');
  }

  await next();
};


























export const signUp = async (ctx: Context, next: () => Promise<any>) => {
  const payload: ISignUpRequest = ctx.request.body;
  ctx.state.data = await authService.signUp(payload);
  await next();
};

export const forgotPassword = async (ctx: Context, next: () => Promise<any>) => {
  const email: string = ctx.request.body.email;
  ctx.state.data = await authService.forgotPassword(email);
  await next();
};

export const verifyHash = async (ctx: Context, next: () => Promise<any>) => {
  const email: string = ctx.request.body.email;
  const hash: string = ctx.request.body.hash;
  const verifyEmail: boolean = ctx.request.body.verifyEmail || false;
  ctx.state.data = await authService.verifyHash(email, hash);
  await next();
};

export const resetPassword = async (ctx: Context, next: () => Promise<any>) => {
  const payload: IResetPassword = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
    hash: ctx.request.body.hash
  };
  ctx.state.data = await authService.resetPassword(payload);
  await next();
};

export const changePassword = async (ctx: Context, next: () => Promise<any>) => {
  const payload: IChangePassword = {
    oldPassword: ctx.request.body.oldPassword,
    newPassword: ctx.request.body.newPassword,
  };
  const userId: string = ctx.state.user.userId;
  ctx.state.data = await authService.changePassword(userId, payload);
  await next();
};