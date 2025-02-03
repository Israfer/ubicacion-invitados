// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { doGet, doPost } from "./routes.js";

dotenv.config();

const app = express();

// Habilita CORS y el parseo de JSON
app.use(cors());
app.use(express.json());

// Endpoint GET que simula la función doGet original
// Se espera el parámetro sheetId en la query
app.get("/", doGet);

// Endpoint POST que simula la función doPost original
// Se espera en el body un JSON con al menos la propiedad "qrData" y opcionalmente "sheetId"
app.post("/", doPost);

// Ruta 404 para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
