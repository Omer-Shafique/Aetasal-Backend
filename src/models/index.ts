import * as Sequelize from 'sequelize';
import { Database } from './../bootstrap/database';

// Import model specification from its own definition file.
import * as Role from './role';
import * as User from './user';
import * as Department from './department';
import * as OfficeLocation from './office-location';
import * as Group from './group';
import * as UserGroup from './user-group';
import * as ListOfValue from './list-of-value';
import * as UserRole from './user-role';
import * as Application from './application';
import * as ApplicationWorkflow from './application-workflow';
import * as ApplicationFormSection from './application-form-section';
import * as ApplicationFormField from './application-form-field';
import * as ApplicationWorkflowPermission from './application-workflow-permission';
import * as ApplicationWorkflowFieldPermission from './application-workflow-field-permission';
import * as ApplicationExecution from './application-execution';
import * as ApplicationExecutionForm from './application-execution-form';
import * as ApplicationExecutionWorkflow from './application-execution-workflow';
import * as Lookup from './lookup';
import * as LookupData from './lookup-data';
import * as Notification from './notification';
import * as UserLocationTrail from './user-location-trail';

export interface IModelFactory extends Sequelize.Models {
  Role: Role.IRoleModel;
  User: User.IUserModel;
  Department: Department.IDepartmentModel;
  OfficeLocation: OfficeLocation.IOfficeLocationModel;
  Group: Group.IGroupModel;
  UserGroup: UserGroup.IUserGroupModel;
  ListOfValue: ListOfValue.IListOfValueModel;
  UserRole: UserRole.IUserRoleModel;
  Application: Application.IApplicationModel;
  ApplicationWorkflow: ApplicationWorkflow.IApplicationWorkflowModel;
  ApplicationFormSection: ApplicationFormSection.IApplicationFormSectionModel;
  ApplicationFormField: ApplicationFormField.IApplicationFormFieldModel;
  ApplicationWorkflowPermission: ApplicationWorkflowPermission.IApplicationWorkflowPermissionModel;
  ApplicationWorkflowFieldPermission: ApplicationWorkflowFieldPermission.IApplicationWorkflowFieldPermissionModel;
  ApplicationExecution: ApplicationExecution.IApplicationExecutionModel;
  ApplicationExecutionForm: ApplicationExecutionForm.IApplicationExecutionFormModel;
  ApplicationExecutionWorkflow: ApplicationExecutionWorkflow.IApplicationExecutionWorkflowModel;
  Lookup: Lookup.ILookupModel;
  LookupData: LookupData.ILookupDataModel;
  Notification: Notification.INotificationModel;
  UserLocationTrail: UserLocationTrail.IUserLocationTrailModel;
}

const models: IModelFactory = {
  Role: Role.define(Database),
  User: User.define(Database),
  Department: Department.define(Database),
  OfficeLocation: OfficeLocation.define(Database),
  Group: Group.define(Database),
  UserGroup: UserGroup.define(Database),
  ListOfValue: ListOfValue.define(Database),
  UserRole: UserRole.define(Database),
  Application: Application.define(Database),
  ApplicationWorkflow: ApplicationWorkflow.define(Database),
  ApplicationFormSection: ApplicationFormSection.define(Database),
  ApplicationFormField: ApplicationFormField.define(Database),
  ApplicationWorkflowPermission: ApplicationWorkflowPermission.define(Database),
  ApplicationWorkflowFieldPermission: ApplicationWorkflowFieldPermission.define(Database),
  ApplicationExecution: ApplicationExecution.define(Database),
  ApplicationExecutionForm: ApplicationExecutionForm.define(Database),
  ApplicationExecutionWorkflow: ApplicationExecutionWorkflow.define(Database),
  Lookup: Lookup.define(Database),
  LookupData: LookupData.define(Database),
  Notification: Notification.define(Database),
  UserLocationTrail: UserLocationTrail.define(Database)
};

// Execute the associations where defined
Object.keys(models).map(key => {
  const model: Sequelize.Model<any, any> = models[key];

  if (model.associate) {
    model.associate(models);
  }
});

export const Models: IModelFactory = models;
