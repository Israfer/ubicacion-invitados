// api/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

// Cargar variables de entorno en desarrollo
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// Ruta mínima de prueba: responde inmediatamente con un JSON
app.get("/", (req, res) => {
  console.log("Request received on /");
  res.setHeader("Content-Type", "application/json");
  // Usamos res.end() para forzar el cierre de la respuesta
  res.end(JSON.stringify({ message: "Test OK" }));
});

const handler = serverless(app);
console.log("Handler created.");

// Exporta por defecto una función que envuelve el handler
export default function (req, res) {
  console.log("Handler invoked.");
  return handler(req, res);
}
