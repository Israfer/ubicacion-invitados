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

// Configura CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
  origin: "http://localhost:3000", // Permite solicitudes desde este origen
  methods: "GET,POST", // Métodos permitidos
  credentials: true // Permite el envío de cookies y encabezados de autenticación
}));

// Desactivar Keep-Alive para forzar el cierre de la conexión y evitar timeout
app.use((req, res, next) => {
  res.setHeader("Connection", "close");
  next();
});

app.use(express.json());

// Ruta base para /api: responde inmediatamente
app.get("/api", (req, res) => {
  console.log("Request received on /api");
  res.setHeader("Content-Type", "application/json");
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  });
});

// Monta las rutas de la API (imitando el código original)
app.use("/api", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Crea el handler usando serverless-http y exporta directamente
const handler = serverless(app);
export default handler;