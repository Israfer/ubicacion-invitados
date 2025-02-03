// api/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import guestLocationRoutes from "../routes/guestLocation.js";

// Cargar variables de entorno en desarrollo
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para la raíz de la función (accedida como /api en la URL pública)
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  });
});

// Monta las rutas de la API (las rutas se definen en guestLocationRoutes)
app.use("/", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Exporta por defecto la función manejadora usando serverless-http
export default serverless(app);
