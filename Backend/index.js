// backend/index.js (COMPLETO Y CORREGIDO)

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // NECESARIO para cargar JWT_SECRET y DATABASE_URL

// Cargar variables de entorno del archivo .env
dotenv.config();

// Importar rutas (las rutas que ya creaste)
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000; // Usa el puerto 4000 o el del .env
const DB_URI = process.env.DATABASE_URL;

// ----------------------------------------------------
// 1. Configuración de CORS RESTRINGIDO
// ----------------------------------------------------
const allowedOrigins = [
  'http://localhost:5173', // Puerto por defecto del Frontend (Vite)
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // NECESARIO para JWT y cualquier cookie/sesión futura
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json()); // Permite a Express leer el body en formato JSON

// 2. CONEXIÓN DE LAS RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ----------------------------------------------------
// 3. Conexión a MongoDB e inicio del servidor
// ----------------------------------------------------
mongoose.connect(DB_URI)
  .then(() => {
    console.log('✅ Conexión a MongoDB exitosa.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error fatal de conexión a MongoDB:', error.message);
    // Terminar el proceso si no se puede conectar a la DB
    process.exit(1); 
  });