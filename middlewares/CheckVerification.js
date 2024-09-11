const User = require('../models/User');

const checkVerification = async (req, res, next) => {
  try {
    const { userId } = req.params; // Asume que envías el ID de usuario

    const user = await User.findById(userId);
    if (!user || !user.verified) {
      return res.status(403).send('Necesitas verificar tu correo para descargar el PDF');
    }

    next(); // Permitir la descarga si está verificado
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

module.exports = {
  checkVerification,
};
