// src/App.jsx
import React, { useState, useCallback } from "react";
import SearchLocation from "./components/SearchLocation";
import InteractiveMap from "./components/InteractiveMap";
import QRImageUpload from "./components/QRImageUpload";
import "./app.css";
import "./index.css";

function App() {
  // 'view' determina qué vista se muestra: "qr", "search" o "map"
  const [view, setView] = useState("search"); // Valor por defecto; cambia según necesidad
  // ID de la Google Sheet (valor por defecto)
  const [sheetId, setSheetId] = useState("1n_b8RZ7DkWNu-Ht0N-3hYKDhyapNVN8fMwSXb8fT8aU");
  // Estado para almacenar resultados (por ejemplo, de búsqueda o QR)
  const [resultData, setResultData] = useState(null);

  // Función para resetear la vista
  const resetView = useCallback(() => {
    setResultData(null);
    setView(null);
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Ubicación de Invitados</h1>
      <div className="menu-container">
        <button onClick={() => setView("search")}>Búsqueda por Nombre</button>
        <button onClick={() => setView("qr")}>Subir Imagen de QR</button>
        <button onClick={() => setView("map")}>Ver Mapa</button>
      </div>

      {/* Se muestra el input para cambiar el sheetId si se desea */}
      <div className="sheet-input-container">
        <input
          type="text"
          value={sheetId}
          onChange={(e) => setSheetId(e.target.value)}
          placeholder="ID de la Google Sheet"
        />
      </div>

      {view === "search" && (
        <SearchLocation sheetId={sheetId} setResultData={setResultData} />
      )}
      {view === "qr" && <QRImageUpload sheetId={sheetId} setResultData={setResultData} />}
      {view === "map" && <InteractiveMap sheetId={sheetId} />}
      
      {resultData && (
        <div className="result-container">
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(resultData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
