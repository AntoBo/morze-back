import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const { POSTGRESQL_CONNECTION } = process.env;

const sequelize = new Sequelize(`${POSTGRESQL_CONNECTION}`);

export const User: any = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

(async () => {
  await sequelize.sync({ alter: true });
})();
