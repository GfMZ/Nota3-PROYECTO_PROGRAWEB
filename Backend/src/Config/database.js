// 💾 src/Config/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs'; // Necesario para leer el certificado CA

dotenv.config();

const caCertPath = process.env.DB_CA_CERT_PATH; 
const isProduction = process.env.NODE_ENV === 'production' && caCertPath;

let sslConfiguration = {};

if (isProduction) {
    try {
        // Intentar leer el certificado de forma segura (con manejo de error)
        const caCertContent = fs.readFileSync(caCertPath).toString();
        sslConfiguration = {
            ca: caCertContent,
            rejectUnauthorized: true, 
        };
        
    } catch (error) {
        // SI FALLA LA LECTURA DEL ARCHIVO: Imprimir el error y luego salir.
        console.error('❌ ERROR FATAL DE ARCHIVO: No se pudo leer el certificado CA:', error.message);
        console.error('Asegúrese de que el archivo existe y que la variable DB_CA_CERT_PATH es correcta.');
        
        // Forzamos la salida para que Azure lo registre, ya que no podemos continuar sin el certificado.
        process.exit(1); 
    }
}

const sequelize = new Sequelize(
    process.env.DB_NAME,       
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT, 
        dialect: 'postgres',       
        logging: false,            
        
        dialectOptions: {
            // Usar la configuración SSL si se cargó el archivo, o 'false' si estamos en desarrollo
            ssl: isProduction ? sslConfiguration : false
        },
    }
);

export default sequelize;