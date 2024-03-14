import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';
import { IRoleAttributes, IRoleInstance } from './role';

export interface IUserRoleAttributes {
    id?: number;
    roleId?: number;
    userId: string;
    isActive: boolean;
    role?: IRoleAttributes;
}

export interface IUserRoleInstance extends Sequelize.Instance<IUserRoleAttributes> {
    id?: number;
    roleId?: number;
    userId: string;
    isActive: boolean;
    role?: IRoleInstance;
}

export interface IUserRoleModel extends Sequelize.Model<IUserRoleInstance, IUserRoleAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IUserRoleModel => {
    const model: IUserRoleModel = sequelize.define('userRole', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
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
        model.belongsTo(models.Role);
    };

    return model;
};
