import * as Sequelize from 'sequelize';

import { Models } from '../models/index';
import { IGroupInstance, IGroupAttributes } from '../models/group';
import { IUserGroupInstance, IUserGroupAttributes } from '../models/user-group';

export const getAll = async () => {
    return Models.Group.findAll({
        where: {
            isActive: true
        },
        include: [Models.UserGroup]
    });
};

export const getCount = async () => {
    return Models.Group.count({
        where: {
            isActive: true
        }
    });
};

export const findById = async (id: number) => {
    return Models.Group.findOne({ where: { id }});
};

export const findUserGroupByGroupId = async (groupId: number) => {
    return Models.UserGroup.findAll({ where: { groupId }});
};

export const saveGroup = async (group: IGroupAttributes) => {
    return Models.Group.insertOrUpdate(group, { returning: true });
};

export const insertUserGroup = async (userGroup: IUserGroupAttributes[]) => {
    return Models.UserGroup.bulkCreate(userGroup);
};

export const deleteGroup = async (id: number) => {
    return Models.Group.update({ isActive: false }, { where: { id }});
};

export const deleteUserGroupByGroupId = async (groupId: number) => {
    return Models.UserGroup.destroy({ where: { groupId }});
};
