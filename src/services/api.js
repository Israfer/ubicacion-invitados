// src/services/api.js
import axios from "axios";

// URL del backend (configurable vía variables de entorno)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://ubicacion-invitados.vercel.app/api";

/**
 * Obtiene sugerencias de búsqueda a partir de un query.
 * @param {string} query - Texto a buscar.
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Sugerencias.
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
 * Obtiene el detalle de búsqueda (resultado único) usando el parámetro detalle=true.
 * @param {string} query - Texto a buscar o datos del QR.
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Detalle del registro.
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
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Datos del croquis.
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
 * @param {string} mesa - Número o identificador de la mesa.
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Datos de la mesa.
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
