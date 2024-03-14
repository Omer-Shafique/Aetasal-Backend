import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/office-location';
import * as userRepo from '../repositories/user';
import * as officeLocationRepo from '../repositories/office-location';
import { IOfficeLocationInstance, IOfficeLocationAttributes } from '../models/office-location';

export const getAll = async (): Promise<IOfficeLocationInstance[]> => {
    return officeLocationRepo.getAll();
};

export const saveOfficeLocation = async (officeLocation: IOfficeLocationAttributes) => {
    await validate(officeLocation, joiSchema.saveOfficeLocation);
    if (officeLocation.id) {
        const savedOfficeLocation = await officeLocationRepo.findById(officeLocation.id);
        if (!savedOfficeLocation) {
            throw boom.badRequest('Invalid Office Location Id');
        }
    }
    if (officeLocation.userId) {
        const user = await userRepo.findById(officeLocation.userId);
        if (!user) {
            throw boom.badRequest('Invalid User');
        }
    }
    await officeLocationRepo.saveOfficeLocation(officeLocation);
    return { success: true };
};

export const deleteOfficeLocation = async (id: number) => {
    await validate({ id }, joiSchema.deleteOfficeLocation);
    const officeLocation = await officeLocationRepo.findById(id);
    if (!officeLocation) {
        throw boom.badRequest('Invalid Office Location Id');
    }
    await officeLocationRepo.deleteOfficeLocation(id);
    return { success: true };
};
