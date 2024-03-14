import * as boom from 'boom';
var _ = require('lodash')
import { validate } from '../validations/index';

import * as joiSchema from '../validations/schemas/group';
import * as groupRepo from '../repositories/group';
import * as userRepo from '../repositories/user';
import { IGroupInstance, IGroupAttributes } from '../models/group';
import { ISaveGroup, IGetGroupResponse } from '../interface/group';
import { IUserGroupAttributes } from '../models/user-group';

export const getAll = async (): Promise<IGetGroupResponse[]> => {
    const groups = await groupRepo.getAll();
    const response: IGetGroupResponse[] = [];
    groups.forEach(group => {
        const userIds = group.userGroups ? _.map(group.userGroups, 'userId') : [];
        response.push({
            id: group.id,
            name: group.name,
            userIds
        });
    });
    return response;
};

export const saveGroup = async (group: ISaveGroup) => {
    await validate(group, joiSchema.saveGroup);
    const toSaveGroup: IGroupAttributes = {
        id: group.id,
        name: group.name,
        isActive: true
    };
    if (group.userIds && group.userIds.length) {
        const users = await userRepo.findByIds(group.userIds);
        if (users.length !== _.uniq(group.userIds).length) {
            throw boom.badRequest('Invalid User');
        }
    }
    const savedGroup = await groupRepo.saveGroup(toSaveGroup);
    if (toSaveGroup.id) {
        await groupRepo.deleteUserGroupByGroupId(toSaveGroup.id);
    }
    if (!group.userIds || !group.userIds.length) {
        return { success: true };
    }
    const userGroups: IUserGroupAttributes[] = group.userIds.map((userId) => {
        return {
            groupId: savedGroup[0].id,
            userId,
            isActive: true
        };
    });
    await groupRepo.insertUserGroup(userGroups);
    return { success: true };
};

export const deleteGroup = async (id: number) => {
    await validate({ id }, joiSchema.deleteGroup);
    const group = await groupRepo.findById(id);
    if (!group) {
        throw boom.badRequest('Invalid Group Id');
    }
    await groupRepo.deleteGroup(id);
    return { success: true };
};
