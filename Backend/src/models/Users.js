import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  // --- CAMPOS DEL DIAGRAMA (CORREGIDOS) ---
  username: { type: DataTypes.STRING, unique: true }, 
  password: { type: DataTypes.STRING, allowNull: false },
  
  // Ahora estos son los oficiales
  firstName: { type: DataTypes.STRING, allowNull: false }, 
  lastName: { type: DataTypes.STRING, allowNull: false },  
  
  address: { type: DataTypes.STRING },   
  city: { type: DataTypes.STRING },      
  phone: { type: DataTypes.STRING },     

  // Campos Extras de App
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  
  // Campo para bloqueo/desbloqueo
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  
  // --- CAMPOS AÑADIDOS PARA RESTABLECIMIENTO DE CONTRASEÑA ---
  resetPasswordToken: { type: DataTypes.STRING },
  resetPasswordExpires: { type: DataTypes.DATE },
  // -----------------------------------------------------------
  
  country: { type: DataTypes.STRING } 
}, { timestamps: false });

// Esto asegura que la contraseña se hashee tanto al crear como al guardar/actualizar.
User.beforeSave(async (user) => { 
  // Solo hashea si el campo 'password' ha sido modificado.
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;