import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/department';
import * as departmentRepo from '../repositories/department';
import * as userRepo from '../repositories/user';
import { IDepartmentInstance, IDepartmentAttributes } from '../models/department';

export const getAll = async (): Promise<IDepartmentInstance[]> => {
    return departmentRepo.getAll();
};

export const saveDepartment = async (department: IDepartmentAttributes) => {
    await validate(department, joiSchema.saveDepartment);
    if (department.id) {
        const savedDepart = await departmentRepo.findById(department.id);
        if (!savedDepart) {
            throw boom.badRequest('Invalid Department Id');
        }
    }
    if (department.userId) {
        const user = await userRepo.findById(department.userId);
        if (!user) {
            throw boom.badRequest('Invalid User');
        }
    }
    await departmentRepo.saveDepartment(department);
    return { success: true };
};

export const deleteDepartment = async (id: number) => {
    await validate({ id }, joiSchema.deleteDepartment);
    const department = await departmentRepo.findById(id);
    if (!department) {
        throw boom.badRequest('Invalid Department Id');
    }
    await departmentRepo.deleteDepartment(id);
    return { success: true };
};
