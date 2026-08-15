import dotenv from "dotenv";
import { Sequelize } from "sequelize";
// import mysql from 'mysql2/promise';

dotenv.config();

// //connecting mysql Database
// export default mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// });

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        logging: false,
        pool: {
            max: Number(process.env.POOL_MAX),
            min: Number(process.env.POOL_MIN),
            acquire: Number(process.env.POOL_ACQUIRE),
            idle: Number(process.env.POOL_IDLE),
        },
    }
);

// Sync database
export const conntectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  MySQL connected');
    await sequelize.sync({ force: false });
    console.log('✅  Database synchronized');
  } 
  catch (error) {
    console.error('❌  Unable to connect to the database:', error);
  }
};

export default sequelize;
