import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface ILookupDataAttributes {
    id: number;
    lookupId: number;
    display: string;
    value: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
}

export interface ILookupDataInstance extends Sequelize.Instance<ILookupDataAttributes> {
    id: number;
    lookupId: number;
    display: string;
    value: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
}

export interface ILookupDataModel extends Sequelize.Model<ILookupDataInstance, ILookupDataAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): ILookupDataModel => {
    const model: ILookupDataModel = sequelize.define('lookupData', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        lookupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'lookup',
                key: 'id'
            }
        },
        display: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
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
        model.belongsTo(models.Lookup);
    };

    return model;
};
