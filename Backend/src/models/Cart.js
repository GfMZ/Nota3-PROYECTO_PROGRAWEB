import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import User from './Users.js';
import Product from './Products.js';

// Tabla CarritoDeCompra
const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  // userId se crea por la relación abajo
}, { timestamps: false });

// Tabla ItemDeCarrito
// Diagrama: Id, IdCarrito, IdProducto
export const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 } // Asumimos cantidad
}, { timestamps: false });

// Relaciones
Cart.belongsTo(User, { foreignKey: 'userId' }); // IdUsuario en Carrito
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' }); // IdCarrito en Item
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); // IdProducto en Item
Product.hasMany(CartItem, { foreignKey: 'productId' });

export default Cart;