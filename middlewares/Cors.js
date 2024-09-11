const cors = require('cors');
const dotenv = require('dotenv');

const allowedOrigins = [
  process.env.FRONT_URL,
  'http://localhost:3000',
  'https://backend-m-consiente.onrender.com/api/user',
  'https://movimiento-consiente.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
