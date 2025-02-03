// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import guestLocationRoutes from "./routes/guestLocation.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para la raíz /api: cuando se acceda a /api se devolverá un mensaje informativo
app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /api/buscar, /api/croquis y /api/mesa."
  });
});

// Monta las rutas de la API con el prefijo /api
app.use("/api", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
