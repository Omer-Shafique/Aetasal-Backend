import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/lookup';
import * as lookupRepo from '../repositories/lookup';
import * as userRepo from '../repositories/user';
import { ILookupInstance, ILookupAttributes } from '../models/lookup';

export const getAll = async (): Promise<ILookupInstance[]> => {
    return lookupRepo.getAll();
};

export const saveLookup = async (userId: string, lookup: ILookupAttributes) => {
    await validate(lookup, joiSchema.saveLookup);
    if (lookup.id) {
        const savedLookup = await lookupRepo.findById(lookup.id);
        if (!savedLookup) {
            throw boom.badRequest('Invalid Lookup Id');
        }
    }
    lookup.createdBy = userId;
    return lookupRepo.saveLookup(lookup);
};

export const deleteLookup = async (id: number) => {
    await validate({ id }, joiSchema.deleteLookup);
    const lookup = await lookupRepo.findById(id);
    if (!lookup) {
        throw boom.badRequest('Invalid Lookup Id');
    }
    await lookupRepo.deleteLookup(id);
    return { success: true };
};
