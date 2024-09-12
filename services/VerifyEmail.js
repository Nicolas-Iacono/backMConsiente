const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const { SECRET_KEY } = process.env;

const router = express.Router();

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Buscar al usuario por su ID
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Marcar al usuario como verificado si no lo está
    if (!user.verified) {
      user.verified = 1;
      await user.save();
    }

    // Redirigir a una página o ruta segura donde se pueda descargar el PDF
    return res.redirect(`https://olive-tapir-884444.hostingersite.com/success.html`);
  } catch (error) {
    console.error('Error al verificar el correo:', error);
    return res.status(400).send('Enlace de verificación inválido o expirado');
  }
});

module.exports = router;
