// api/index.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

// Creamos una aplicación Express mínima para probar
const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba: responde inmediatamente con un mensaje
app.get("/", (req, res) => {
  console.log("Request received on /");
  res.json({ message: "Test OK" });
});

// Creamos el handler serverless una sola vez
const handler = serverless(app);
console.log("Handler created.");

// Exportamos por defecto una función que invoque al handler
export default function (req, res) {
  console.log("Handler invoked.");
  return handler(req, res);
}
