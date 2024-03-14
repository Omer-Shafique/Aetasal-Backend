import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IUserGroupAttributes {
    id?: number;
    groupId?: number;
    userId: string;
    isActive: boolean;
}

export interface IUserGroupInstance extends Sequelize.Instance<IUserGroupAttributes> {
    id?: number;
    groupId?: number;
    userId: string;
    isActive: boolean;
}

export interface IUserGroupModel extends Sequelize.Model<IUserGroupInstance, IUserGroupAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IUserGroupModel => {
    const model: IUserGroupModel = sequelize.define('userGroup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.UUIDV4,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        isActive: Sequelize.BOOLEAN
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.User);
        model.belongsTo(models.Group);
    };

    return model;
};
