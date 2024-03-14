import * as boom from 'boom';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/lookup';
import * as lookupRepo from '../repositories/lookup';
import * as lookupDataRepo from '../repositories/lookup-data';
import * as userRepo from '../repositories/user';
import { ILookupDataInstance, ILookupDataAttributes } from '../models/lookup-data';

export const findByLookupId = async (lookupId: number): Promise<ILookupDataInstance[]> => {
    return lookupDataRepo.findByLookupId(lookupId);
};

export const findLookupDataById = async (id: number): Promise<ILookupDataInstance | null> => {
    return lookupDataRepo.findLookupDataById(id);
};

export const saveLookupData = async (userId: string, lookupId: number, lookupData: ILookupDataAttributes) => {
    await validate({ ...lookupData, lookupId }, joiSchema.saveLookupData);
    const savedLookup = await lookupRepo.findById(lookupId);
    if (!savedLookup) {
        throw boom.badRequest('Invalid Lookup Id');
    }
    if (lookupData.id) {
        const savedLookupData = await lookupDataRepo.findById(lookupData.id);
        if (!savedLookupData) {
            throw boom.badRequest('Invalid Lookup Data Id');
        }
    }
    lookupData.lookupId = lookupId;
    lookupData.createdBy = userId;
    return lookupDataRepo.saveLookupData(lookupData);
};

export const deleteLookupData = async (lookupId: number, id: number) => {
    await validate({ id }, joiSchema.deleteLookup);
    const savedLookup = await lookupRepo.findById(lookupId);
    if (!savedLookup) {
        throw boom.badRequest('Invalid Lookup Id');
    }
    const lookupData = await lookupDataRepo.findById(id);
    if (!lookupData) {
        throw boom.badRequest('Invalid Lookup Data Id');
    }
    await lookupDataRepo.deleteLookupData(id);
    return { success: true };
};
