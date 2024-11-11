// import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../config/database';  // Assuming you're importing sequelize instance

// class Task extends Model {
//   public id!: number;
//   public title!: string;
//   public createdByName!: string;
//   public labels!: any;  // For simplicity, we can store labels as a JSON object
// }

// Task.init({
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   createdByName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   labels: {
//     type: DataTypes.JSONB,  // Store labels as a JSONB object in PostgreSQL
//     defaultValue: []  // Default to an empty array
//   }
// }, {
//   sequelize,
//   modelName: 'Task'
// });

// export default Task;
