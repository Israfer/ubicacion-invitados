// services/googleScriptService.js
import axios from "axios";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
console.log("GOOGLE_SCRIPT_URL:", googleScriptUrl);
if (!googleScriptUrl) {
  throw new Error("La variable de entorno GOOGLE_SCRIPT_URL no está configurada.");
}

// Puedes agregar timeout si es necesario, por ejemplo, 8000 ms:
// const AXIOS_TIMEOUT = 8000;

/**
 * Simula la función buscarUbicacion (similar al Apps Script original).
 */
export async function buscarUbicacion({ parameter: { sheetId, search, detalle } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "buscar");
    url.searchParams.append("sheetId", sheetId);
    url.searchParams.append("search", search);
    if (detalle === "true" || detalle === true) {
      url.searchParams.append("detalle", "true");
    }
    console.log("Llamando a URL en buscarUbicacion:", url.toString());
    const response = await axios.get(url.toString() /*, { timeout: AXIOS_TIMEOUT }*/);
    return response.data;
  } catch (error) {
    console.error("Error en buscarUbicacion:", error);
    throw new Error(`Error en buscarUbicacion: ${error.message}`);
  }
}

/**
 * Simula la función getCroquisData para obtener datos del mapa interactivo.
 */
export async function getCroquisData({ parameter: { sheetId } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "croquis");
    url.searchParams.append("sheetId", sheetId);
    console.log("Llamando a URL en getCroquisData:", url.toString());
    const response = await axios.get(url.toString() /*, { timeout: AXIOS_TIMEOUT }*/);
    return response.data;
  } catch (error) {
    console.error("Error en getCroquisData:", error);
    throw new Error(`Error en getCroquisData: ${error.message}`);
  }
}

/**
 * Simula la función getMesaData para obtener los registros de una mesa.
 */
export async function getMesaData({ parameter: { mesa, sheetId } }) {
  try {
    const url = new URL(googleScriptUrl);
    url.searchParams.append("action", "mesa");
    url.searchParams.append("sheetId", sheetId);
    url.searchParams.append("mesa", mesa);
    console.log("Llamando a URL en getMesaData:", url.toString());
    const response = await axios.get(url.toString() /*, { timeout: AXIOS_TIMEOUT }*/);
    return response.data;
  } catch (error) {
    console.error("Error en getMesaData:", error);
    throw new Error(`Error en getMesaData: ${error.message}`);
  }
}
