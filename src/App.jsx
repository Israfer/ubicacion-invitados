// src/App.jsx
import React, { useState, useCallback } from "react";
import Scanner from "./components/Scanner";
import SearchLocation from "./components/SearchLocation";
import InteractiveMap from "./components/InteractiveMap";
import "./app.css";
import "./index.css";

function App() {
  // Vista actual: "qr", "search" o "map"
  const [view, setView] = useState("qr");
  const [sheetId, setSheetId] = useState("1n_b8RZ7DkWNu-Ht0N-3hYKDhyapNVN8fMwSXb8fT8aU"); // Reemplaza con el ID por defecto
  const [showSheetInput, setShowSheetInput] = useState(false);

  // Estados para QR
  const [scanResult, setScanResult] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetScanner = useCallback(() => {
    setScanResult(null);
    setLocationData(null);
  }, []);

  const handleScan = useCallback(async (data) => {
    if (data) {
      setScanResult(data);
      setLoading(true);
      try {
        // Se usa el mismo endpoint de búsqueda, enviando el dato del QR como "qrData"
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || "https://ubicacion-invitados.vercel.app/api"}/buscar?sheetId=${sheetId}&qrData=${data}&detalle=true`
        );
        const result = await response.json();
        setLocationData(result);
      } catch (error) {
        console.error("Error en la API:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [sheetId]);

  return (
    <div className="app-container">
      <h1 className="title">Ubicación de Invitados</h1>
      <div className="menu-container">
        <button onClick={() => setView("qr")}>QR</button>
        <button onClick={() => setView("search")}>Búsqueda</button>
        <button onClick={() => setView("map")}>Mapa</button>
        <button className="sheet-button" onClick={() => setShowSheetInput(prev => !prev)}>📄</button>
      </div>
      {showSheetInput && (
        <div className="sheet-input-container">
          <input
            type="text"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="ID de la Google Sheet"
          />
        </div>
      )}
      {view === "qr" && (
        <div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Procesando...
            </div>
          ) : scanResult ? (
            <div>
              <h3>Resultados del Escaneo</h3>
              {locationData && locationData.result ? (
                <div>
                  <p><strong>Nombre:</strong> {locationData.result.nombre}</p>
                  <p><strong>Mesa:</strong> {locationData.result.mesa}</p>
                  <p><strong>Silla:</strong> {locationData.result.silla}</p>
                  <p><strong>Tipo:</strong> {locationData.result.tipo}</p>
                </div>
              ) : (
                <p>No se encontró un resultado único.</p>
              )}
            </div>
          ) : (
            <Scanner onScan={handleScan} />
          )}
        </div>
      )}
      {view === "search" && <SearchLocation sheetId={sheetId} />}
      {view === "map" && <InteractiveMap sheetId={sheetId} />}
    </div>
  );
}

export default App;
