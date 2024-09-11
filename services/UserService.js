const  User  = require('../models/User');
const sendMail = require('../mailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const { SECRET_KEY } =  process.env.SECRET_KEY;

const calculateIMC = (weight, height) => {
  return (weight / ((height / 100) ** 2)).toFixed(2); 
};

const createUser = async ({ username, lastname, age, weight, height, email }) => {
  try {
    const newUser = await User.create({
      username,
      lastname,
      age,
      weight,
      height,
      email,
      verified: 0,
    });

    // Contenido del correo con estilos HTML
    const adminHtmlContent = `
      <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #2196F3; font-weight: 500; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Nuevo Usuario Agregado</h2>
  <p style="font-size: 16px; color: #555;">Se ha agregado un nuevo usuario con los siguientes detalles:</p>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Nombre:</span> 
      <span style="color: #424242;">${username}</span>
    </li>
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Apellido:</span> 
      <span style="color: #424242;">${lastname}</span>
    </li>
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Edad:</span> 
      <span style="color: #424242;">${age}</span>
    </li>
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Peso:</span> 
      <span style="color: #424242;">${weight} kg</span>
    </li>
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Altura:</span> 
      <span style="color: #424242;">${height} cm</span>
    </li>
    <li style="margin-bottom: 10px; font-size: 16px;">
      <span style="font-weight: 500; color: #757575;">Email:</span> 
      <span style="color: #424242;">${email}</span>
    </li>
  </ul>
  
</div>

    `;

    // Envía el correo de notificación
    sendMail(
      'zarlengaleandroadrian@gmail.com',
      'Nuevo usuario agregado',
      adminHtmlContent
    );

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1d' });

    // Enlace de verificación
    const verificationLink = `https://olive-tapir-884444.hostingersite.com/verify-email?token=${token}`;

    const imc = calculateIMC(weight, height);
    const userHtmlContent = `
    <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #2196F3; font-weight: 500; border-bottom: 2px solid #2196F3; padding-bottom: 8px;">Gracias por tu suscripción, ${username}!</h2>
      <p style="font-size: 16px; color: #555;">Nos alegra que te hayas unido. Aquí está tu índice de masa corporal (IMC) calculado en base a los datos proporcionados:</p>
      <p style="font-size: 20px; font-weight: 500; color: #4CAF50;">Tu IMC es: <strong>${imc}</strong></p>
      <p style="font-size: 16px; color: #555;">Por favor verifica tu correo para completar el registro. Haz clic en el siguiente enlace:</p>
        <div style="margin-top: 20px; text-align: center;">
          <a href="${verificationLink}" style="text-decoration: none; font-weight: 500; color: #fff; background-color: #2196F3; padding: 10px 20px; border-radius: 4px; box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);">Verificar Correo</a>
        </div>
          <p style="font-size: 16px; color: #555;">Luego podras descargar la Guia Movimiento Consiente</p>

    </div>
  `;

  sendMail(
    email, // Correo del usuario
    `Movimiento Con.Siente, lo prometido para vos ${username} `,
    userHtmlContent
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
