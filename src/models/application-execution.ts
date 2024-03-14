import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';
import {
  IApplicationExecutionFormAttributes,
  IApplicationExecutionFormInstance
} from './application-execution-form';
import { IApplicationAttributes, IApplicationInstance } from './application';
import {
  IApplicationExecutionWorkflowAttributes,
  IApplicationExecutionWorkflowInstance } from './application-execution-workflow';
import { IUserAttributes, IUserInstance } from './user';

export interface IApplicationExecutionAttributes {
    id?: string;
    applicationId?: string;
    startedAt?: Date;
    status?: string;
    title?: string;
    latitude?: number;
    longitude?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    application?: IApplicationAttributes;
    applicationExecutionForms?: IApplicationExecutionFormAttributes[];
    applicationExecutionWorkflows?: IApplicationExecutionWorkflowAttributes[];
    createdByUser?: IUserAttributes;
}

export interface IApplicationExecutionInstance extends Sequelize.Instance<IApplicationExecutionAttributes> {
    id: string;
    applicationId: string;
    startedAt: Date;
    status: string;
    title: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    application?: IApplicationInstance;
    applicationExecutionForms?: IApplicationExecutionFormInstance[];
    applicationExecutionWorkflows?: IApplicationExecutionWorkflowInstance[];
    createdByUser?: IUserInstance;
}

export interface IApplicationExecutionModel
    extends Sequelize.Model<IApplicationExecutionInstance, IApplicationExecutionAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationExecutionModel => {
    const model: IApplicationExecutionModel = sequelize.define('applicationExecution', {
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
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
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
        model.belongsTo(models.User, { foreignKey: 'createdBy', as: 'createdByUser' });

        model.hasMany(models.ApplicationExecutionForm);
        model.hasMany(models.ApplicationExecutionWorkflow);
    };

    return model;
};
