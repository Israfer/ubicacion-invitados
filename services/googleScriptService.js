// services/googleScriptService.js
const axios = require('axios');

// Nota: En Vercel, las variables de entorno se inyectan automáticamente, por lo que no es necesario usar dotenv en producción.
// Si usas dotenv en local, puedes dejarlo para pruebas locales, pero en producción es preferible confiar en process.env.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
console.log("GOOGLE_SCRIPT_URL:", googleScriptUrl);

if (!googleScriptUrl) {
  throw new Error("La variable de entorno GOOGLE_SCRIPT_URL no está configurada.");
}

/**
 * Llama al endpoint GET para buscar ubicación.
 * @param {Object} param0 - Objeto con property parameter que contiene sheetId, search y detalle.
 * @returns {Promise<Object>} Resultado de la búsqueda.
 */
async function buscarUbicacion({ parameter: { sheetId, search, detalle } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "buscar");
    url.searchParams.append("sheetId", sheetId);
    url.searchParams.append("search", search);
    if (detalle === "true" || detalle === true) {
      url.searchParams.append("detalle", "true");
    }
    console.log("Llamando a URL en buscarUbicacion:", url.toString());
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error en buscarUbicacion:", error);
    throw new Error(`Error en buscarUbicacion: ${error.message}`);
  }
}

/**
 * Llama al endpoint GET para obtener los datos del croquis.
 * @param {Object} param0 - Objeto con property parameter.sheetId.
 * @returns {Promise<Object>} Datos del croquis.
 */
async function getCroquisData({ parameter: { sheetId } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "croquis");
    url.searchParams.append("sheetId", sheetId);
    console.log("Llamando a URL en getCroquisData:", url.toString());
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error en getCroquisData:", error);
    throw new Error(`Error en getCroquisData: ${error.message}`);
  }
}

/**
 * Llama al endpoint GET para obtener los registros de una mesa.
 * @param {Object} param0 - Objeto con property parameter que contiene mesa y sheetId.
 * @returns {Promise<Object>} Datos de la mesa.
 */
async function getMesaData({ parameter: { mesa, sheetId } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "mesa");
    url.searchParams.append("sheetId", sheetId);
    url.searchParams.append("mesa", mesa);
    console.log("Llamando a URL en getMesaData:", url.toString());
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error en getMesaData:", error);
    throw new Error(`Error en getMesaData: ${error.message}`);
  }
}

module.exports = { buscarUbicacion, getCroquisData, getMesaData };
