import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IOfficeLocationInstance, IOfficeLocationAttributes } from '../models/office-location';

export const getAll = async () => {
    return Models.OfficeLocation.findAll({
        attributes: ['id', 'name', 'userId', 'createdAt', 'updatedAt'],
        where: {
            isActive: true
        },
        include: [{
            model: Models.User,
            attributes: ['id', 'firstName', 'lastName', 'email']
        }]
    });
};

export const getCount = async () => {
    return Models.OfficeLocation.count({
        where: {
            isActive: true
        }
    });
};

export const findById = async (id: number) => {
    return Models.OfficeLocation.findOne({ where: { id }});
};

export const saveOfficeLocation = async (officeLocation: IOfficeLocationAttributes) => {
    return Models.OfficeLocation.insertOrUpdate(officeLocation);
};

export const deleteOfficeLocation = async (id: number) => {
    return Models.OfficeLocation.update({ isActive: false }, { where: { id }});
};
