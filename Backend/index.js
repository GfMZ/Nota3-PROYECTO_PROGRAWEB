import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/Config/database.js';

// MODELOS: Importamos con los nombres PLURALES que tienes
import './src/Models/Users.js';      // <-- Antes User.js
import './src/Models/Categories.js'; // <-- Antes Category.js
import './src/Models/Products.js';   // <-- Antes Product.js
import './src/Models/Cart.js';
import './src/Models/Order.js';

// Rutas
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
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
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Error de base de datos:', error);
  }
};

startServer();