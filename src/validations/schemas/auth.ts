import * as Joi from 'joi';
import { Role } from '../../enum/role';

export const loginSchema: Joi.SchemaMap = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const signUpSchema: Joi.SchemaMap = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid([Role.SUPER_ADMIN, Role.USER, Role.BILLING, Role.APP_CREATOR]),
    timezone: Joi.string().required(),
};

export const socialLoginSchema: Joi.SchemaMap = {
    email: Joi.string().email().required(),
    accessToken: Joi.string().required(),
    phoneNo: Joi.string(),
    socialProvider: Joi.string(),
    pictureUrl: Joi.string(),
    timezone: Joi.string(),
    role: Joi.when('isSignUp', {
        is: true,
        then: Joi.string().required().valid([Role.SUPER_ADMIN, Role.USER, Role.BILLING, Role.APP_CREATOR])
    }),
};

export const forgotSchema: Joi.SchemaMap = {
    email: Joi.string().email().required(),
};

export const verifyEmailSchema: Joi.SchemaMap = {
    email: Joi.string().email().required(),
    hash: Joi.string().required()
};

export const resetPassword: Joi.SchemaMap = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    hash: Joi.string().required()
};

export const changePassword: Joi.SchemaMap = {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
};
