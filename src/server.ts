// import app from 'app';
import app from './app';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { PORT, POSTGRESQL_CONNECTION } = process.env;

const sequelize = new Sequelize(`${POSTGRESQL_CONNECTION}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));
