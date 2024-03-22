import * as Sequelize from 'sequelize';
import { IUserAttributes, IUserInstance } from './user';

export interface IUserRoleAttributes {
  id?: number;
  roleId?: number;
  userId: string;
  isActive: boolean;
}

export interface IUserRoleInstance extends Sequelize.Instance<IUserRoleAttributes>, IUserRoleAttributes {}

export interface IUserRoleModel extends Sequelize.Model<IUserRoleInstance, IUserRoleAttributes> {}

export const defineUserRoleModel = (sequelize: Sequelize.Sequelize): IUserRoleModel => {
  const model: IUserRoleModel = sequelize.define<IUserRoleInstance, IUserRoleAttributes>(
    'userRole',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  model.associate = (models: any) => {
    model.belongsTo(models.User, { foreignKey: 'userId' });
    // Add other associations as needed
  };

  return model;
};

export function define(_Database: Sequelize.Sequelize): IUserRoleModel {
  throw new Error('Function not implemented.');
}
