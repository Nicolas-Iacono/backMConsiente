require('dotenv').config(); // Importa dotenv para cargar variables de entorno

const express = require("express");
const morgan = require("morgan");
const cors = require("./middlewares/Cors");
const userRoutes = require('./routes/userRoutes');
const dbInit = require('./database/dbInit'); 
const path = require('path');

const app = express();

app.set("port", process.env.PORT || 10000);

// Middleware
app.use(morgan("dev"));
app.use(cors);
app.use(express.json());

app.use('/api', userRoutes);


app.listen(app.get("port"), async () => {
  console.log("Escuchando en puerto " + app.get("port"));
  try {
    await dbInit(); // Sincronizar modelos
    console.log("Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
});
