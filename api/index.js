// api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const guestLocationRoutes = require('../routes/guestLocation');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para la raíz /api: cuando se acceda a https://.../api se devolverá un mensaje informativo.
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  });
});

// Monta las rutas de la API (se definieron en routes/guestLocation.js)
app.use('/', guestLocationRoutes);

// Ruta 404 para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Exporta el handler para que Vercel lo use
module.exports.handler = serverless(app);
