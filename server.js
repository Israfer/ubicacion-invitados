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

// Ruta raíz para mostrar un mensaje de bienvenida o información del API
app.get("/", (req, res) => {
  res.send("Bienvenido al Backend de Ubicación de Invitados. Utiliza la ruta /api para acceder a los endpoints.");
});

// Rutas de la API para Ubicación de Invitados
app.use("/api", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
