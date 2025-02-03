// services/googleScriptService.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
if (!googleScriptUrl) {
  throw new Error("La variable de entorno GOOGLE_SCRIPT_URL no está configurada.");
}

/**
 * Llama al endpoint GET para buscar ubicación.
 * @param {string} query - Texto de búsqueda o datos del QR.
 * @param {string} sheetId - ID de la Google Sheet.
 * @param {boolean} detalle - Si se requiere detalle único.
 * @returns {Promise<Object>} Resultado de la búsqueda.
 */
export async function buscarUbicacion(query, sheetId, detalle) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "buscar");
    url.searchParams.append("sheetId", sheetId);
    // Se envía el query como "search"
    url.searchParams.append("search", query);
    if (detalle) {
      url.searchParams.append("detalle", "true");
    }
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    throw new Error(`Error en buscarUbicacion: ${error.message}`);
  }
}

/**
 * Llama al endpoint GET para obtener los datos del croquis.
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Datos del croquis.
 */
export async function getCroquisData(sheetId) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "croquis");
    url.searchParams.append("sheetId", sheetId);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    throw new Error(`Error en getCroquisData: ${error.message}`);
  }
}

/**
 * Llama al endpoint GET para obtener los registros de una mesa.
 * @param {string} mesa - Número o identificador de la mesa.
 * @param {string} sheetId - ID de la Google Sheet.
 * @returns {Promise<Object>} Datos de la mesa.
 */
export async function getMesaData(mesa, sheetId) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "mesa");
    url.searchParams.append("sheetId", sheetId);
    url.searchParams.append("mesa", mesa);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    throw new Error(`Error en getMesaData: ${error.message}`);
  }
}
