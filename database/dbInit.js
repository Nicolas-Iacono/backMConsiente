const sequelize = require('./connection');
const User = require('../models/User');
const Message = require('../models/Message');

const dbInit = async () => {
  try {
    await User.sync();
    await Message.sync();
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
};

module.exports = dbInit;
