import * as boom from 'boom';
import * as _ from 'lodash';
import * as encryption from '../utils/encryption';
import * as userRepo from '../repositories/user';
import * as departmentRepo from '../repositories/department';
import * as officeLocationRepo from '../repositories/office-location';
import * as joiSchema from '../validations/schemas/user';
import { IUserRequest } from '../interface/user';
import { validate } from './../validations/index';
import { IUserAttributes, IUserInstance } from '../models/user';
import { IUserRoleAttributes } from './../models/user-role';

export const findById = async (userId: string) => {
    await validate({ userId }, joiSchema.getUserById);
    let user: any = await userRepo.findById(userId);
    if (!user) {
        throw boom.badRequest('Invalid user id');
    }
    user = user.get({ plain: true });
    const roleIds = _.reject(
        user.userRoles.map((userRole: any) => userRole.role && userRole.role.id), _.isUndefined);
    user.roleIds = roleIds;
    delete user.userRoles;
    return user;
};

// export const getAll = async (loggedInUser: any) => {
//     if (!loggedInUser) {
//         throw boom.badRequest('No logged-in user found');
//     }

//     const users: any = await userRepo.getAll();
//     const returnUsers = [];
//     for (let user of users) {
//         user = user.get({ plain: true });
//         if (user.id === loggedInUser.userId) {
//             user.firstName = 'Self';
//             user.lastName = '';
//         }
//         const roles = _.reject(
//             user.userRoles.map((userRole: any) => userRole.role && userRole.role.name), _.isUndefined);
//         user.role = roles;
//         delete user.userRoles;
//         returnUsers.push(user);
//     }
//     return returnUsers;
// };


export const getAll = async () => {
    const users: any = await userRepo.getAll();
    const returnUsers = [];
    for (let user of users) {
        user = user.get({ plain: true });
        user.firstName = user.firstName || 'Default';
        user.lastName = user.lastName || 'User';
        const roles = _.reject(
            user.userRoles.map((userRole: any) => userRole.role && userRole.role.name), _.isUndefined);
        user.role = roles;
        delete user.userRoles;
        returnUsers.push(user);
    }
    return returnUsers;
};










export const getByDepartmentId = async (departmentId: number, loggedInUserId: string) => {
    await validate({ departmentId }, joiSchema.getUserByDepartmentId);
    let users: any;
    if (loggedInUserId) {
        users = await userRepo.getByDepartmentId(departmentId, loggedInUserId);
        const indexOfCurrentUser = users.findIndex((user: any) => user.id === loggedInUserId);
        if (indexOfCurrentUser >= 0) {
            users[indexOfCurrentUser].firstName = 'Self';
            users[indexOfCurrentUser].lastName = '';
        }
        return users;
    } else {
        throw boom.badRequest('No logged-in user ID found');
    }
};

export const saveUser = async (payload: IUserRequest) => {
    await validate(payload, joiSchema.userRequest);
    const existingUser = await userRepo.findByEmail(payload.email);
    if (existingUser && existingUser.id !== payload.id) {
        throw boom.badRequest('User already exist with same email');
    }
    if (payload.id) {
        const editUser = await userRepo.findById(payload.id);
        if (!editUser) {
            throw boom.badRequest('Invalid user id');
        }
    }
    if (payload.managerId) {
        const user = await userRepo.findById(payload.managerId);
        if (!user) {
            throw boom.badRequest('Invalid manager id');
        }
    }
    if (payload.departmentId) {
        const department = await departmentRepo.findById(payload.departmentId);
        if (!department) {
            throw boom.badRequest('Invalid department id');
        }
    }
    if (payload.officeLocationId) {
        const officeLocation = await officeLocationRepo.findById(payload.officeLocationId);
        if (!officeLocation) {
            throw boom.badRequest('Invalid office location id');
        }
    }
    let user: Partial<IUserRequest> = {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        country: payload.country,
        city: payload.city,
        contactNo: payload.contactNo,
        email: payload.email,
        pictureUrl: payload.pictureUrl || undefined,
        gender: payload.gender,
        timezone: payload.timezone || undefined,
        managerId: payload.managerId,
        departmentId: payload.departmentId,
        officeLocationId: payload.officeLocationId
    };
    if (payload.password) {
        const encryptedPassword = encryption.saltHashPassword(payload.password);
        user.password = encryptedPassword;
    }
    const savedUser = await userRepo.upsertUser(user);
    const userRoles: IUserRoleAttributes[] = [];
    payload.roleIds.forEach((roleId) => {
        userRoles.push({
            userId: savedUser[0].id,
            roleId,
            isActive: true
        });
    });
    await userRepo.deleteUserRoles(savedUser[0].id);
    await userRepo.saveUserRoles(userRoles);
    return { success: true };
};

export const deleteUser = async (loggedInUserId: string, userId: string) => {
    await validate({ userId }, joiSchema.getUserById);
    if (loggedInUserId === userId) {
        throw boom.badRequest('You are not authorize to delete this user');
    }
    const user = await userRepo.findById(userId);
    if (!user) {
        throw boom.badRequest('Invalid user id');
    }
    await userRepo.deleteUser(loggedInUserId, userId);
    return { success: true };
};