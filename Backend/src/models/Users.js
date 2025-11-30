import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  
  username: { type: DataTypes.STRING, unique: true }, 
  password: { type: DataTypes.STRING, allowNull: false },
  
  
  firstName: { type: DataTypes.STRING, allowNull: false }, 
  lastName: { type: DataTypes.STRING, allowNull: false },  
  
  address: { type: DataTypes.STRING },   
  city: { type: DataTypes.STRING },      
  phone: { type: DataTypes.STRING },     

 
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  
  
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  
  
  resetPasswordToken: { type: DataTypes.STRING },
  resetPasswordExpires: { type: DataTypes.DATE },
  
  
  country: { type: DataTypes.STRING } 
}, { timestamps: false });


User.beforeSave(async (user) => { 
  
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;