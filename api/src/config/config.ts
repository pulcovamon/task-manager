import sequelize from "./database";
import { Task } from "../models/task";

sequelize.sync({ force: true }) // force true is just for development
  .then(() => {
    console.log('Database & tables created!');
  });