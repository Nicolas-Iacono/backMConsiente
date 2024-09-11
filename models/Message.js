const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');

class Message extends Model {}

Message.init({
  id_message: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_usuario',
    },
  },
}, {
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  tableName: 'message',
});

// Define associations
User.hasMany(Message, { foreignKey: 'id_usuario' });
Message.belongsTo(User, { foreignKey: 'id_usuario' });

// Sync models with database
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((err) => {
    console.error('Error al sincronizar los modelos:', err);
  });

module.exports = Message;
