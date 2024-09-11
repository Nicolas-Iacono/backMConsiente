
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();
const verifyEmail = async (req, res) => {
  const { token } = req.query;
  
  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Actualiza el estado de verificación del usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    user.verified = true;
    await user.save();

    res.send('Correo verificado con éxito. Ahora puedes descargar el PDF.');
  } catch (error) {
    res.status(400).send('El enlace de verificación no es válido o ha expirado');
  }
};

module.exports = {
  verifyEmail,
};
