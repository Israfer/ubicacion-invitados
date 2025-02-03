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

// Ruta raíz para la API (lo que se muestra al acceder a https://ubicacion-invitados.vercel.app/api)
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Ubicación de Invitados. Utilice los endpoints /buscar, /croquis y /mesa."
  });
});

// Monta las rutas de la API en la raíz, ya que Vercel remapea /api a la raíz en este caso.
app.use("/", guestLocationRoutes);

// Ruta 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
