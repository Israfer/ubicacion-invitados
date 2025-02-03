// routes.js

/**
 * Función doGet:
 * - Verifica que se reciba el parámetro "sheetId".
 * - Retorna un JSON con un total simulado de invitados ingresados.
 */
export function doGet(req, res) {
    const sheetId = req.query.sheetId;
    if (!sheetId) {
      return res.status(400).json({ error: "Falta el ID de la Google Sheet" });
    }
  
    // En el código original se abría la Google Sheet y se contaban las filas con estado "ingresado".
    // Aquí se simula ese proceso devolviendo un número fijo.
    const totalIngresados = 42;
    return res.json({ totalIngresados });
  }
  
  /**
   * Función doPost:
   * - Valida que se reciba un JSON en el body con la propiedad "qrData".
   * - Usa un sheetId por defecto si no se envía.
   * - Simula la búsqueda de un invitado y retorna una respuesta dummy.
   */
  export function doPost(req, res) {
    try {
      if (!req.body || !req.body.qrData) {
        return res.status(400).json({ error: "Solicitud inválida o falta el parámetro 'qrData'" });
      }
      
      const data = req.body;
      // Se usa un sheetId por defecto si no se envía
      const SHEET_ID = data.sheetId || "1n_b8RZ7DkWNu-Ht0N-3hYKDhyapNVN8fMwSXb8fT8aU";
      
      // Simula la conversión de qrData a número
      const qrNumber = parseInt(data.qrData, 10);
      
      // Se simula la búsqueda: si qrNumber es 123, se asume que el invitado se encuentra.
      let response;
      if (isNaN(qrNumber)) {
        response = { status: "invalid", message: "QR data no es un número válido" };
      } else if (qrNumber === 123) { // condición de ejemplo
        response = { status: "ingresado", numeroInvitado: 123, nombre: "Juan Pérez", numeroMesa: "5" };
      } else {
        response = { status: "invalid", message: "Invitado no encontrado" };
      }
      
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Error en el servidor", details: error.message });
    }
  }
  