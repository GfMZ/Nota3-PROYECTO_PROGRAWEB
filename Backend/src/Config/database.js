import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST, // localhost
        dialect: 'postgres',       // Motor de base de datos
        logging: false,            // Poner en 'console.log' si quieres ver los queries SQL en la terminal
    }
);

export default sequelize;