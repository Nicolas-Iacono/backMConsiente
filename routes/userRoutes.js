const express = require('express');
const { createUser } = require('../services/UserService');
const router = express.Router();

router.post('/user', async (req, res) => {
  try {
    const { username, lastname, age, weight, height, email } = req.body;
    const newUser = await createUser({ username, lastname, age, weight, height, email });

    res.status(201).json({ 
      message: 'Usuario creado con éxito', 
      userId: newUser.idUser,
      username,
      lastname,
      age,
      height,
      weight,
      email 
    });
  } catch (error) {
    res.status(500).send('Error al guardar los datos del usuario');
  }
});

module.exports = router;
