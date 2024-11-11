import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IDepartmentAttributes {
    id: number;
    name: string;
    userId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDepartmentInstance extends Sequelize.Instance<IDepartmentAttributes> {
    id: number;
    name: string;
    userId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDepartmentModel extends Sequelize.Model<IDepartmentInstance, IDepartmentAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IDepartmentModel => {
    const model: IDepartmentModel = sequelize.define('department', {
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
        userId: {
            type: Sequelize.UUIDV4,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        isActive: Sequelize.BOOLEAN,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.User);
    };

    return model;
};
