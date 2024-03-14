import * as boom from 'boom';
import * as moment from 'moment';
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/user-location-trail';
import * as userLocationTrailRepo from '../repositories/user-location-trail';
import * as userRepo from '../repositories/user';
import { IUserLocationTrailInstance, IUserLocationTrailAttributes } from '../models/user-location-trail';

export const getAll = async (
    userId: number, startDate?: Date, endDate?: Date
): Promise<IUserLocationTrailInstance[]> => {
    await validate({ userId, startDate, endDate }, joiSchema.getAll);
    if (endDate) {
        endDate = moment(moment(endDate).format('MM-DD-YYYY') + ' 23:59:59').toDate();
    }
    return userLocationTrailRepo.getAll(userId, startDate, endDate);
};

export const saveOfficeLocation = async (userLocationTrail: IUserLocationTrailAttributes) => {
    await validate(userLocationTrail, joiSchema.saveUserLocationTrail);
    if (userLocationTrail.id) {
        const savedUserLocationTrail = await userLocationTrailRepo.findById(userLocationTrail.id);
        if (!savedUserLocationTrail) {
            throw boom.badRequest('Invalid User Location Trail Id');
        }
    }
    if (userLocationTrail.userId) {
        const user = await userRepo.findById(userLocationTrail.userId);
        if (!user) {
            throw boom.badRequest('Invalid User');
        }
    }
    await userLocationTrailRepo.saveUserLocationTrail(userLocationTrail);
    return { success: true };
};
