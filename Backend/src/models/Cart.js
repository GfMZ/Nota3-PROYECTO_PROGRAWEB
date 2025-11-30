import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import User from './Users.js';
import Product from './Products.js';


const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

}, { timestamps: false });


export const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 } 
}, { timestamps: false });

// Relaciones
Cart.belongsTo(User, { foreignKey: 'userId' }); 
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' }); 
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); 
Product.hasMany(CartItem, { foreignKey: 'productId' });

export default Cart;