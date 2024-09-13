import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare completed: boolean;
  declare deadline: Date | null
}