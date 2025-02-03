// src/services/api.js
import axios from "axios";

// URL base del backend (puedes configurarla vía variable de entorno)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://ubicacion-invitados.vercel.app/api";

/**
 * Obtiene sugerencias de búsqueda.
 */
export async function fetchSearchSuggestions(query, sheetId) {
  try {
    const response = await axios.get(`${BACKEND_URL}/buscar`, {
      params: { sheetId, search: query }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo sugerencias: " + error.message);
  }
}

/**
 * Obtiene el detalle de búsqueda (resultado único) usando detalle=true.
 */
export async function fetchSearchDetail(query, sheetId) {
  try {
    const response = await axios.get(`${BACKEND_URL}/buscar`, {
      params: { sheetId, search: query, detalle: "true" }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo el detalle: " + error.message);
  }
}

/**
 * Obtiene los datos del croquis para el mapa interactivo.
 */
export async function fetchCroquisData(sheetId) {
  try {
    const response = await axios.get(`${BACKEND_URL}/croquis`, {
      params: { sheetId }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo datos del croquis: " + error.message);
  }
}

/**
 * Obtiene los registros de una mesa.
 */
export async function fetchMesaData(mesa, sheetId) {
  try {
    const response = await axios.get(`${BACKEND_URL}/mesa`, {
      params: { sheetId, mesa }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error obteniendo datos de la mesa: " + error.message);
  }
}
