import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IListOfValueInstance, IListOfValueAttributes } from '../models/list-of-value';

export const findByKeys = async (keys: string[]) => {
    return Models.ListOfValue.findAll({
        where: {
            key: {
                [Sequelize.Op.in]: keys
            },
            isActive: true
        },
        attributes: ['id', 'key', 'value']
    });
};

export const findAllCount = async (ids: number[]) => {
    return Models.ListOfValue.count({
        where: {
            id: {
                [Sequelize.Op.in]: ids
            },
            isActive: true
        },
    });
};
