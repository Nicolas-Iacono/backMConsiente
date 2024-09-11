const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'u837927235_m_consiente_db',        // Nombre de la base de datos
  process.env.DB_USER || 'u837927235_root',                // Usuario de la base de datos
  process.env.DB_PASSWORD || 'Lindura_010',        // Contraseña del usuario
  {
    host: process.env.DB_HOST || 'localhost',   // Dirección del servidor MySQL
    dialect: process.env.DB_DIALECT || 'mysql', // Cambiar a 'mysql'
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306, // Puerto de MySQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false // Desactivar los logs de Sequelize (opcional)
  });

// Función para probar la conexión
const connDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con base de datos MySQL exitosa');
  } catch (error) {
    console.log('Error de conexión con base de datos MySQL:', error);
  }
};

// Ejecutar la función de prueba de conexión
connDB();

// Exportar la instancia de Sequelize
module.exports = sequelize;
