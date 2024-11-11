import { IUserGroupAttributes, IUserGroupInstance } from './user-group';
import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IGroupAttributes {
    id?: number;
    name: string;
    isActive: boolean;
    userGroups?: IUserGroupAttributes[];
}

export interface IGroupInstance extends Sequelize.Instance<IGroupAttributes> {
    id?: number;
    name: string;
    isActive: boolean;
    userGroups?: IUserGroupInstance[];
}

export interface IGroupModel extends Sequelize.Model<IGroupInstance, IGroupAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IGroupModel => {
    const model: IGroupModel = sequelize.define('group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: Sequelize.BOOLEAN
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
        model.hasMany(models.UserGroup);
    };

    return model;
};
