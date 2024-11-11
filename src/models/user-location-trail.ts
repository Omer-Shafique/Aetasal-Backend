import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IUserLocationTrailAttributes {
    id: number;
    userId: string;
    latitude: number;
    longitude: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserLocationTrailInstance extends Sequelize.Instance<IUserLocationTrailAttributes> {
    id: number;
    userId: string;
    latitude: number;
    longitude: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserLocationTrailModel extends
    Sequelize.Model<IUserLocationTrailInstance, IUserLocationTrailAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IUserLocationTrailModel => {
    const model: IUserLocationTrailModel = sequelize.define('userLocationTrail', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.UUID,
          references: {
              model: 'user',
              key: 'id'
          }
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.User);
    };

    return model;
};
