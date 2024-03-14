import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IRoleInstance, IRoleAttributes } from '../models/role';

export const getAll = async () => {
    return Models.Role.findAll({
        where: {
            isActive: true
        }
    });
};

export const getCount = async () => {
    return Models.Role.count({
        where: {
            isActive: true
        }
    });
};

export const findByName = async (name: string) => {
    return Models.Role.findOne({
        where: {
            name
        }
    });
};

export const findById = async (id: number) => {
    return Models.Role.findOne({ where: { id }});
};

export const saveRole = async (role: IRoleAttributes) => {
    return Models.Role.insertOrUpdate(role);
};

export const deleteRole = async (id: number) => {
    return Models.Role.update({ isActive: false }, { where: { id }});
};
