import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import User from './Users.js';
import Product from './Products.js';


const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  

  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 
  total: { type: DataTypes.FLOAT, allowNull: false },          
  subTotal: { type: DataTypes.FLOAT },                         
  deliveryMethod: { type: DataTypes.STRING },                  
  cardNumber: { type: DataTypes.STRING },                      
  cardType: { type: DataTypes.STRING },                        
  isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  shippingAddress: { type: DataTypes.TEXT },
  paymentMethod: { type: DataTypes.STRING } 
}, { timestamps: true });


export const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.FLOAT },
  name: { type: DataTypes.STRING }, 
  imageUrl: { type: DataTypes.STRING }
}, { timestamps: false });


Order.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
User.hasMany(Order, { foreignKey: 'userId' });


Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems', onDelete: 'CASCADE' }); 
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });


OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); 
Product.hasMany(OrderItem, { foreignKey: 'productId' });

export default Order;