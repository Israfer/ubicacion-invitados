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

// Desactivar Keep-Alive en todas las respuestas
app.use((req, res, next) => {
  res.setHeader('Connection', 'close');
  next();
});

app.use(cors());
app.use(express.json());

// Ruta base para /api: responde inmediatamente
app.get("/", (req, res) => {
  console.log("Request received on /");
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({
    message:
      "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  }));
  res.end();
});

// Monta las rutas de la API
app.use("/", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Crea el handler usando serverless-http y exporta directamente
const handler = serverless(app);
export default handler;
