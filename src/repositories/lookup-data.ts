import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { ILookupDataInstance, ILookupDataAttributes } from '../models/lookup-data';

export const findByLookupId = async (lookupId: number) => {
    return Models.LookupData.findAll({
        where: {
            lookupId,
            isActive: true
        },
        attributes: ['id', 'display', 'value']
    });
};

export const findLookupDataById = async (id: number) => {
    return Models.LookupData.findOne({
        where: {
            id,
            isActive: true
        },
        attributes: ['id', 'lookupId', 'display', 'value']
    });
};

export const findById = async (id: number) => {
    return Models.LookupData.findOne({ where: { id }});
};

export const saveLookupData = async (lookupData: ILookupDataAttributes) => {
    return Models.LookupData.insertOrUpdate(lookupData, { returning: true })
        .then((res) => res[0]);
};

export const deleteLookupData = async (id: number) => {
    return Models.LookupData.update({ isActive: false }, { where: { id }});
};
