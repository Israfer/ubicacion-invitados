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

// Ruta mínima de prueba: responde inmediatamente con JSON
app.get("/", (req, res) => {
  console.log("Request received on /");
  res.json({ message: "Test OK" });
});

// Monta las rutas de la API
app.use("/", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Crea el handler usando serverless-http
const handler = serverless(app);

// Exporta por defecto el handler obtenido
export default handler;
