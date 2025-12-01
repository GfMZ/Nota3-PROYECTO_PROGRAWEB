import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import Category from './Categories.js';

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
 
  name: { type: DataTypes.STRING, allowNull: false }, // Nombre
  description: { type: DataTypes.TEXT },              // Descripcion
  brand: { type: DataTypes.STRING },                  // Marca (¡Nuevo!)
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },// Stock
  price: { type: DataTypes.FLOAT, allowNull: false }, // Precio

  
  imageUrl: { type: DataTypes.STRING } 
}, { timestamps: true });


Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

export default Product;