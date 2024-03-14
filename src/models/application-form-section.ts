import * as Sequelize from 'sequelize';

import { IModelFactory } from './index';
import { IApplicationFormFieldAttributes, IApplicationFormFieldInstance } from './application-form-field';

export interface IApplicationFormSectionAttributes {
    id?: string;
    applicationId: string;
    name: string;
    helpText: string;
    type: string;
    order: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    applicationFormFields?: IApplicationFormFieldAttributes[];
}

export interface IApplicationFormSectionInstance extends Sequelize.Instance<IApplicationFormSectionAttributes> {
    id?: string;
    applicationId: string;
    name: string;
    helpText: string;
    type: string;
    order: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    applicationFormFields?: IApplicationFormFieldInstance[];
}

export interface IApplicationFormSectionModel
    extends Sequelize.Model<IApplicationFormSectionInstance, IApplicationFormSectionAttributes> { }

export const define = (sequelize: Sequelize.Sequelize): IApplicationFormSectionModel => {
    const model: IApplicationFormSectionModel = sequelize.define('applicationFormSection', {
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
      helpText: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        model.belongsTo(models.Application);

        model.hasMany(models.ApplicationFormField);
        model.hasMany(models.ApplicationWorkflowFieldPermission);
    };

    return model;
};
