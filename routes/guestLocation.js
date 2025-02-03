// routes/guestLocation.js
import express from "express";
import {
  buscarUbicacion,
  getCroquisData,
  getMesaData
} from "../services/googleScriptService.js";

const router = express.Router();

/**
 * Endpoint GET: /api/buscar
 * Parámetros: sheetId, search (o qrData) y opcional detalle ("true" para obtener detalle único)
 */
router.get("/buscar", async (req, res) => {
  const { sheetId, search, qrData, detalle } = req.query;
  if (!sheetId || (!search && !qrData)) {
    return res.status(400).json({ error: "Falta sheetId o parámetros de búsqueda (search o qrData)" });
  }
  try {
    const query = qrData || search;
    const result = await buscarUbicacion({ 
      parameter: { sheetId, search: query, detalle: detalle } 
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint GET: /api/croquis
 * Parámetro: sheetId
 */
router.get("/croquis", async (req, res) => {
  const { sheetId } = req.query;
  if (!sheetId) {
    return res.status(400).json({ error: "Falta sheetId" });
  }
  try {
    const result = await getCroquisData({ parameter: { sheetId } });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint GET: /api/mesa
 * Parámetros: sheetId, mesa
 */
router.get("/mesa", async (req, res) => {
  const { sheetId, mesa } = req.query;
  if (!sheetId || !mesa) {
    return res.status(400).json({ error: "Falta sheetId o mesa" });
  }
  try {
    const result = await getMesaData({ parameter: { sheetId, mesa } });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
