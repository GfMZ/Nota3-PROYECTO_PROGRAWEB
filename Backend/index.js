// 🖥️ index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/Config/database.js';


import './src/models/Users.js';      
import './src/models/Categories.js'; 
import './src/models/Products.js';   
import './src/models/Cart.js';
import './src/models/Order.js';

// Rutas
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

dotenv.config();
// CAMBIO 1: process.env.PORT viene de Azure y siempre se usa.
// Si no está definido (por ejemplo, en local sin .env), usa 4000.
const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors({
  // CONSIDERACIÓN: En Azure, tendrás que cambiar 'http://localhost:5173'
  // por el dominio de tu frontend si lo despliegas.
  origin: ['http://localhost:5173'], 
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa.');
    await sequelize.sync({ alter: true }); 
    console.log('✅ Tablas sincronizadas.');
    // CAMBIO 2: El log ahora es genérico (no usa localhost en la nube)
    app.listen(PORT, () => console.log(`🚀 Servidor iniciado en el puerto ${PORT}`));
  } catch (error) {
    console.error('❌ Error de base de datos:', error);
  }
};
export default app;

startServer();