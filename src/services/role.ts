import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/office-location';
import * as roleRepo from '../repositories/role';
import { IRoleInstance, IRoleAttributes } from '../models/role';

export const getAll = async (): Promise<IRoleInstance[]> => {
    return roleRepo.getAll();
};

export const saveRole = async (role: IRoleAttributes) => {
    await validate(role, joiSchema.saveOfficeLocation);
    if (role.id) {
        const savedRole = await roleRepo.findById(role.id);
        if (!savedRole) {
            throw boom.badRequest('Invalid Role Id');
        }
    }
    await roleRepo.saveRole(role);
    return { success: true };
};

export const deleteRole = async (id: number) => {
    await validate({ id }, joiSchema.deleteOfficeLocation);
    const role = await roleRepo.findById(id);
    if (!role) {
        throw boom.badRequest('Invalid Role Id');
    }
    await roleRepo.deleteRole(id);
    return { success: true };
};
