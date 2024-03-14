import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IUserLocationTrailInstance, IUserLocationTrailAttributes } from '../models/user-location-trail';

export const getAll = async (userId: number, startDate?: Date, endDate?: Date) => {
    const where: any = {
        userId
    };
    if (startDate) {
        where.createdAt = {
            [Sequelize.Op.gte]: startDate
        };
    }
    if (endDate) {
        where.createdAt = {
            [Sequelize.Op.lte]: endDate
        };
    }
    return Models.UserLocationTrail.findAll({
        where,
        attributes: ['id', 'latitude', 'longitude', 'userId', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']]
    });
};

export const findById = async (id: number) => {
    return Models.UserLocationTrail.findOne({ where: { id }});
};

export const saveUserLocationTrail = async (userLocationTrail: IUserLocationTrailAttributes) => {
    return Models.UserLocationTrail.insertOrUpdate(userLocationTrail);
};
