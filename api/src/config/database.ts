import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/task_manager.sqlite',
});

export default sequelize;