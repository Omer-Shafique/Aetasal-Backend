import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IApplicationWorkflowPermissionAttributes {
    id?: string;
    applicationWorkflowId?: string;
    userId?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowPermissionInstance
    extends Sequelize.Instance<IApplicationWorkflowPermissionAttributes> {
    id?: string;
    applicationWorkflowId?: string;
    userId?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowPermissionModel
    extends Sequelize.Model<IApplicationWorkflowPermissionInstance, IApplicationWorkflowPermissionAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationWorkflowPermissionModel => {
    const model: IApplicationWorkflowPermissionModel = sequelize.define('applicationWorkflowPermission', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      applicationWorkflowId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'applicationWorkflow',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
      }
    }, {
        freezeTableName: true
    });

    model.associate = (models: IModelFactory) => {
      model.belongsTo(models.ApplicationWorkflow);
    };

    return model;
};
