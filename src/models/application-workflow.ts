import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';
import {
  IApplicationWorkflowPermissionAttributes,
  IApplicationWorkflowPermissionInstance
} from './application-workflow-permission';

export interface IApplicationWorkflowAttributes {
    id: string;
    applicationId: string;
    name: string;
    type?: string;
    order: number;
    stepId: string;
    showMap: boolean;
    assignTo?: string | null;
    groupId?: number | null;
    canWithdraw?: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    applicationWorkflowPermissions?: IApplicationWorkflowPermissionAttributes[];
    userIds?: string[];
}

export interface IApplicationWorkflowInstance extends Sequelize.Instance<IApplicationWorkflowAttributes> {
    id: string;
    applicationId: string;
    name: string;
    type?: string;
    order: number;
    stepId: string;
    showMap: boolean;
    assignTo?: string;
    groupId?: number | null;
    canWithdraw?: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    applicationWorkflowPermissions?: IApplicationWorkflowPermissionInstance[];
    userIds?: string[];
}

export interface IApplicationWorkflowModel
    extends Sequelize.Model<IApplicationWorkflowInstance, IApplicationWorkflowAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationWorkflowModel => {
    const model: IApplicationWorkflowModel = sequelize.define('applicationWorkflow', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      applicationId: {
        type: Sequelize.UUID,
        references: {
            model: 'application',
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assignTo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'group',
          key: 'id'
        }
      },
      canWithdraw: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      stepId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'applicationWorkflow',
          key: 'id'
        }
      },
      showMap: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.Application);

        model.hasMany(models.ApplicationWorkflowPermission);
        model.hasMany(models.ApplicationWorkflow, { foreignKey: 'stepId', as: 'step' });
        model.hasMany(models.ApplicationExecutionWorkflow);
    };

    return model;
};
