import { DataTypes } from 'sequelize';

import sequelize from '../Config/database.js'; 

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: 'Descripción no disponible'
  }
}, {
  timestamps: true
});

export default Category;