import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface INotificationAttributes {
    id: number;
    userId: string;
    title: string;
    body: string;
    type: string;
    isRead: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INotificationInstance extends Sequelize.Instance<INotificationAttributes> {
    id: number;
    userId: string;
    title: string;
    body: string;
    type: string;
    isRead: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INotificationModel extends Sequelize.Model<INotificationInstance, INotificationAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): INotificationModel => {
    const model: INotificationModel = sequelize.define('notification', {
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
        title: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        body: {
          type: Sequelize.STRING(500),
          allowNull: false
        },
        type: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
