import * as Sequelize from 'sequelize';
import { IUserRoleInstance } from './user-role';
import { IModelFactory, Models } from './index';

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
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes {
  userRoles: IUserRoleInstance[];
}

export interface IUserModel extends Sequelize.Model<IUserInstance, IUserAttributes> {}

export const define = (sequelize: Sequelize.Sequelize): IUserModel => {
  const model: IUserModel = sequelize.define<IUserInstance, IUserAttributes>(
    'user',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
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
        type: Sequelize.UUID,
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

export const authenticate = async (email: string, password: string) => {
    const where: any = {
        email,
        deletedAt: null
    };
    if (password) {
        where.password = password;
    }
    console.log('Logging Models object:', Models); 
    return Models.User.findOne({
        where,
        include: [{
            model: Models.UserRole,
            include: [{
                model: Models.Role,
                attributes: ['id', 'name']
            }],
            attributes: ['id', 'userId', 'roleId']
        }]
    });
};

export const getActiveUserCount = async () => {
    return Models.User.count({
        where: {
            isActive: true
        }
    });
};
