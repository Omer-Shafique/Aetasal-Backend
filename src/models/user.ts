import * as Sequelize from 'sequelize';
import { IUserRoleAttributes, IUserRoleInstance } from './user-role';

import { IModelFactory } from './index';

export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  contactNo: string;
  pictureUrl: string;
  gender: string;
  managerId: string;
  departmentId: number;
  officeLocationId: number;
  timezone: string;
  isApproved: boolean;
  isActive: boolean;
  deviceId: string;
  createdAt: Date;
  deletedAt: Date;
  deletedBy: string;
  userRoles: IUserRoleAttributes[];
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes> {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  contactNo: string;
  pictureUrl: string;
  gender: string;
  managerId: string;
  departmentId: number;
  officeLocationId: number;
  timezone: string;
  isApproved: boolean;
  isActive: boolean;
  deviceId: string;
  createdAt: Date;
  deletedAt: Date;
  deletedBy: string;
  userRoles: IUserRoleInstance[];
}

export interface IUserModel extends Sequelize.Model<IUserInstance, IUserAttributes> {}

export const define = (sequelize: Sequelize.Sequelize): IUserModel => {
  const model: IUserModel = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pictureUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      managerId: {
        type: Sequelize.UUIDV4,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'department',
          key: 'id'
        }
      },
      officeLocationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'officeLocation',
          key: 'id'
        }
      },
      isApproved: Sequelize.BOOLEAN,
      deviceId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: Sequelize.BOOLEAN,
      deletedAt: Sequelize.DATE,
      deletedBy: Sequelize.UUID
    },
    {
      freezeTableName: true,
      timestamps: true
    },
  );

  model.associate = (models: IModelFactory) => {
    model.hasMany(models.Department);
    model.hasMany(models.OfficeLocation);
    model.hasMany(models.UserGroup);
    model.hasMany(models.UserRole);
  };

  return model;
};
