import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { ILookupInstance, ILookupAttributes } from '../models/lookup';

export const getAll = async () => {
    return Models.Lookup.findAll({
        where: {
            isActive: true
        },
        attributes: ['id', 'name', 'type']
    });
};

export const findByTypes = async (types: string[]) => {
    return Models.Lookup.findAll({
        where: {
            type: {
                [Sequelize.Op.in]: types
            },
            isActive: true
        },
        attributes: ['id', 'name', 'type']
    });
};

export const findById = async (id: number) => {
    return Models.Lookup.findOne({ where: { id }});
};

export const saveLookup = async (lookup: ILookupAttributes) => {
    return Models.Lookup.insertOrUpdate(lookup, { returning: true })
        .then((res) => res[0]);
};

export const deleteLookup = async (id: number) => {
    return Models.Lookup.update({ isActive: false }, { where: { id }});
};
