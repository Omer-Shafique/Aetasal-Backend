'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addIndex('application', ['createdBy']),
      queryInterface.addIndex('applicationFormSection', ['applicationId']),
      queryInterface.addIndex('applicationFormField', ['applicationFormSectionId']),
      queryInterface.addIndex('applicationFormField', ['fieldId']),
      queryInterface.addIndex('applicationWorkflow', ['applicationId']),
      queryInterface.addIndex('applicationWorkflow', ['createdBy']),
      queryInterface.addIndex('applicationWorkflowPermission', ['applicationWorkflowId']),
      queryInterface.addIndex('applicationWorkflowFieldPermission', ['applicationFormSectionId']),
      queryInterface.addIndex('applicationWorkflowFieldPermission', ['applicationFormFieldId']),
      queryInterface.addIndex('applicationWorkflowFieldPermission', ['applicationWorkflowId']),
      queryInterface.addIndex('applicationExecution', ['applicationId']),
      queryInterface.addIndex('applicationExecution', ['createdBy']),
      queryInterface.addIndex('applicationExecution', ['status']),
      queryInterface.addIndex('applicationExecutionForm', ['applicationExecutionId']),
      queryInterface.addIndex('applicationExecutionForm', ['applicationFormFieldId']),
      queryInterface.addIndex('applicationExecutionForm', ['fieldId']),
      queryInterface.addIndex('applicationExecutionWorkflow', ['applicationExecutionId']),
      queryInterface.addIndex('applicationExecutionWorkflow', ['applicationWorkflowId']),
      queryInterface.addIndex('applicationExecutionWorkflow', ['status']),
      queryInterface.addIndex('applicationExecutionWorkflow', ['createdBy']),
      queryInterface.addIndex('user', ['managerId']),
      queryInterface.addIndex('user', ['departmentId']),
      queryInterface.addIndex('user', ['officeLocationId']),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
