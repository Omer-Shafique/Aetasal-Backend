import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IRoleAttributes {
    id?: number;
    name?: string;
    isActive?: boolean;
}

export interface IRoleInstance extends Sequelize.Instance<IRoleAttributes> {
    id?: number;
    name?: string;
    isActive?: boolean;
}

export interface IRoleModel extends Sequelize.Model<IRoleInstance, IRoleAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IRoleModel => {
    const model: IRoleModel = sequelize.define('role', {
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
        model.hasMany(models.UserRole);
    };

    return model;
};
