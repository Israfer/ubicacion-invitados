// src/App.jsx
import React, { useState, useCallback } from "react";
import SearchLocation from "./components/SearchLocation";
import QRImageUpload from "./components/QRImageUpload";
import "./app.css";
import "./index.css";

function App() {
  // 'view' determina qué vista se muestra: null = selección, "search" = búsqueda, "qrUpload" = subir imagen de QR.
  const [view, setView] = useState(null);
  const [sheetId, setSheetId] = useState("1n_b8RZ7DkWNu-Ht0N-3hYKDhyapNVN8fMwSXb8fT8aU"); // Cambia si es necesario
  const [qrResult, setQrResult] = useState(null);

  // Callback que se ejecuta al decodificar el QR
  const handleQRScan = useCallback(
    (data) => {
      console.log("Datos del QR:", data);
      // Llama al endpoint de búsqueda usando el dato del QR
      fetch(`https://ubicacion-invitados.vercel.app/api/buscar?sheetId=${sheetId}&qrData=${encodeURIComponent(data)}&detalle=true`)
        .then((response) => response.json())
        .then((result) => {
          setQrResult(result);
        })
        .catch((error) => console.error("Error al buscar datos del QR:", error));
    },
    [sheetId]
  );

  // Pantalla de selección inicial
  if (view === null) {
    return (
      <div className="app-container">
        <h1 className="title">Ubicación de Invitados</h1>
        <p>Seleccione una opción:</p>
        <button onClick={() => setView("search")}>Buscar por Nombre</button>
        <button onClick={() => setView("qrUpload")}>Subir imagen de QR</button>
      </div>
    );
  }

  // Renderiza la vista seleccionada
  return (
    <div className="app-container">
      <h1 className="title">Ubicación de Invitados</h1>
      <button onClick={() => { setView(null); setQrResult(null); }}>Volver</button>
      {view === "search" && <SearchLocation sheetId={sheetId} />}
      {view === "qrUpload" && <QRImageUpload onScan={handleQRScan} />}
      {qrResult && (
        <div>
          <h2>Resultado de la búsqueda por QR</h2>
          {qrResult.result ? (
            <div>
              <p><strong>Nombre:</strong> {qrResult.result.nombre}</p>
              <p><strong>Mesa:</strong> {qrResult.result.mesa}</p>
              <p><strong>Silla:</strong> {qrResult.result.silla}</p>
              <p><strong>Tipo:</strong> {qrResult.result.tipo}</p>
              <p><strong>Estado:</strong> {qrResult.result.estado}</p>
            </div>
          ) : (
            <p>No se encontró un resultado único o hubo un error.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
