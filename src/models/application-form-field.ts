import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';

export interface IApplicationFormFieldAttributes {
    id?: string;
    applicationFormSectionId?: string;
    name: string;
    helpText: string;
    fieldId: string;
    key: string;
    type: string;
    defaultValue: string;
    icon: string;
    templateName: string;
    templateOptions: any;
    lookupId: number;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // custom
    permission?: string;
}

export interface IApplicationFormFieldInstance extends Sequelize.Instance<IApplicationFormFieldAttributes> {
    id?: string;
    applicationFormSectionId?: string;
    name: string;
    helpText: string;
    fieldId: string;
    key: string;
    type: string;
    defaultValue: string;
    icon: string;
    templateName: string;
    templateOptions: any;
    lookupId: number;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationFormFieldModel
    extends Sequelize.Model<IApplicationFormFieldInstance, IApplicationFormFieldAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationFormFieldModel => {
    const model: IApplicationFormFieldModel = sequelize.define('applicationFormField', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      applicationFormSectionId: {
        type: Sequelize.UUID,
        references: {
            model: 'applicationFormSection',
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      helpText: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      fieldId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      defaultValue: {
        type: Sequelize.STRING,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      templateName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      templateOptions: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      lookupId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: 'lookup',
        //     key: 'id'
        // }
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
    }, {
        freezeTableName: true,
        timestamps: true
    });

    model.associate = (models: IModelFactory) => {
      model.belongsTo(models.ApplicationFormSection);
      // model.belongsTo(models.Lookup);

      model.hasMany(models.ApplicationWorkflowFieldPermission);
    };

    return model;
};
