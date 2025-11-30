// 💾 src/Config/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs'; // <-- NECESARIO para leer el certificado CA

dotenv.config();

// 1. Obtener la ruta del certificado CA (subido a la carpeta 'certs')
const caCertPath = process.env.DB_CA_CERT_PATH; 

// 2. Comprobar si el entorno es de producción (Azure) para aplicar SSL
const isProduction = process.env.NODE_ENV === 'production' && caCertPath;

const sequelize = new Sequelize(
    process.env.DB_NAME,       
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT, // <-- AÑADIDO: Usa el puerto 5432
        dialect: 'postgres',       
        logging: false,            
        
        // 3. Configuración SSL/TLS CRÍTICA para Azure
        dialectOptions: {
            ssl: isProduction ? {
                // Leer el contenido del certificado PEM
                ca: fs.readFileSync(caCertPath).toString(),
                // Azure lo exige: rechazar conexiones no autorizadas 
                rejectUnauthorized: true, 
            } : false // En local, no usar SSL
        },
    }
);

export default sequelize;