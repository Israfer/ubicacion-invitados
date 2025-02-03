// api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const guestLocationRoutes = require('../routes/guestLocation');

// Cargar variables de entorno (en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para la raíz de la función (accedida como /api en la URL pública)
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  });
});

// Monta las rutas de la API con el prefijo tal cual
app.use('/', guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Exporta el handler para que Vercel lo use
module.exports.handler = serverless(app);
