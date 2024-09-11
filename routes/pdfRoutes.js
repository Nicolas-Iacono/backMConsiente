const express = require('express');
const { checkVerification } = require('../middlewares/CheckVerification');

const router = express.Router();

router.get('/download/:userId', checkVerification, (req, res) => {
  // Aquí envías el archivo PDF al usuario
  try {
    res.download('https://olive-tapir-884444.hostingersite.com/pdf-descarga/archivoprueba.pdf');
  } catch(err) {
    return res.status(403).send('email expirado.');
  }
  
});

module.exports = router;