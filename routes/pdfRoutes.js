const  User  = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.get('/descarga', async (req, res) => {
  // Aquí debes asegurarte de que el usuario está autenticado y verificado
  const { SECRET_KEY } = process.env;
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findByPk(decoded.userId);

    if (!user || !user.verified) {
      return res.status(403).send('No autorizado para descargar el archivo');
    }

    // Si el usuario está verificado, envía el archivo PDF
    const filePath = 'jgu39roc2dmfg3fhdd1ye33rjkfo/guia_alimentaria_semanal.pdf'; // Cambia esto con la ruta real del archivo
    return res.download(filePath);
  } catch (error) {
    console.error('Error en la descarga del archivo:', error);
    return res.status(400).send('Token inválido o expirado');
  }
});
