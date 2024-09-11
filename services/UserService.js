const  User  = require('../models/User');
const sendMail = require('../mailer');

const createUser = async ({ username, lastname, age, weight, height, email }) => {
  try {
    const newUser = await User.create({
      username,
      lastname,
      age,
      weight,
      height,
      email,
    });

    // Contenido del correo con estilos HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Nuevo usuario agregado</h2>
        <p>Se ha agregado un nuevo usuario con los siguientes detalles:</p>
        <ul>
          <li><strong>Nombre:</strong> ${username}</li>
          <li><strong>Apellido:</strong> ${lastname}</li>
          <li><strong>Edad:</strong> ${age}</li>
          <li><strong>Peso:</strong> ${weight} kg</li>
          <li><strong>Altura:</strong> ${height} cm</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
      </div>
    `;

    // Envía el correo de notificación
    sendMail(
      'zarlengaleandroadrian@gmail.com',
      'Nuevo usuario agregado',
      htmlContent
    );

    return newUser;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

module.exports = {
  createUser,
};
