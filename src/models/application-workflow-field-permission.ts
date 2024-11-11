import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IApplicationWorkflowFieldPermissionAttributes {
    id?: string;
    applicationId?: string;
    applicationWorkflowId?: string;
    applicationFormSectionId?: string;
    applicationFormFieldId?: string;
    permission?: string;
    type?: string;
    conditions?: any;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowFieldPermissionInstance
    extends Sequelize.Instance<IApplicationWorkflowFieldPermissionAttributes> {
    id?: string;
    applicationId?: string;
    applicationWorkflowId?: string;
    applicationFormSectionId?: string;
    applicationFormFieldId?: string;
    permission?: string;
    type?: string;
    conditions?: any;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowFieldPermissionModel extends
    Sequelize.Model<IApplicationWorkflowFieldPermissionInstance, IApplicationWorkflowFieldPermissionAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationWorkflowFieldPermissionModel => {
    const model: IApplicationWorkflowFieldPermissionModel = sequelize.define('applicationWorkflowFieldPermission', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      applicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'application',
          key: 'id'
        }
      },
      applicationWorkflowId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'applicationWorkflow',
          key: 'id'
        }
      },
      applicationFormSectionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'applicationFormSection',
          key: 'id'
        }
      },
      applicationFormFieldId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'applicationFormField',
          key: 'id'
        }
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conditions: {
        type: Sequelize.JSONB,
        allowNull: true,
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
      model.belongsTo(models.Application);
      model.belongsTo(models.ApplicationFormSection);
      model.belongsTo(models.ApplicationFormField);
    };

    return model;
};
