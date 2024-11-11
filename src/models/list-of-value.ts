import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IListOfValueAttributes {
    id?: number;
    key?: string;
    value?: string;
    isActive?: boolean;
}

export interface IListOfValueInstance extends Sequelize.Instance<IListOfValueAttributes> {
    id?: number;
    key?: string;
    value?: string;
    isActive?: boolean;
}

export interface IListOfValueModel extends Sequelize.Model<IListOfValueInstance, IListOfValueAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IListOfValueModel => {
    const model: IListOfValueModel = sequelize.define('listOfValue', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive: Sequelize.BOOLEAN
    }, {
        freezeTableName: true
    });

    model.associate = () => {
        // no relation
    };

    return model;
};
