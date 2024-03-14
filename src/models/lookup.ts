import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';
import { ILookupDataAttributes, ILookupDataInstance } from './lookup-data';

export interface ILookupAttributes {
    id: number;
    name: string;
    type: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    lookupDatas: ILookupDataAttributes[];
}

export interface ILookupInstance extends Sequelize.Instance<ILookupAttributes> {
    id: number;
    name: string;
    type: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    lookupDatas: ILookupDataInstance[];
}

export interface ILookupModel extends Sequelize.Model<ILookupInstance, ILookupAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): ILookupModel => {
    const model: ILookupModel = sequelize.define('lookup', {
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
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: Sequelize.BOOLEAN,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        createdBy: {
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
        model.hasMany(models.LookupData);
        // model.hasMany(models.ApplicationFormField);
    };

    return model;
};
