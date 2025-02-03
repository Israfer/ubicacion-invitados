// src/components/InteractiveMap.jsx
import React, { useState, useEffect } from "react";
import { fetchCroquisData, fetchMesaData } from "../services/api";

const InteractiveMap = ({ sheetId }) => {
  const [mapData, setMapData] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [mesaDetails, setMesaDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCroquisData(sheetId)
      .then((data) => {
        // Se espera que data.croquis sea un arreglo de filas: [Mesa, PosX, PosY, ...]
        setMapData(data.croquis || []);
      })
      .catch((err) => setError(err.message));
  }, [sheetId]);

  const handleMesaClick = (mesa) => {
    setSelectedMesa(mesa);
    fetchMesaData(mesa, sheetId)
      .then((data) => {
        setMesaDetails(data.personas || []);
      })
      .catch((err) => setError(err.message));
  };

  const closePopup = () => {
    setSelectedMesa(null);
    setMesaDetails([]);
  };

  return (
    <div>
      <h2>Mapa Interactivo de Mesas</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ position: "relative", width: "600px", height: "400px", border: "1px solid #ccc", margin: "auto" }}>
        {mapData.map((table, index) => {
          // Se espera que cada fila sea: [Mesa, PosX, PosY]
          const mesaNumber = table[0];
          const posX = table[1];
          const posY = table[2];
          const style = {
            position: "absolute",
            left: posX + "px",
            top: posY + "px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "5px",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          };
          return (
            <div key={index} style={style} onClick={() => handleMesaClick(mesaNumber)}>
              {mesaNumber}
            </div>
          );
        })}
      </div>
      {selectedMesa && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          backgroundColor: "#fff", padding: "20px", border: "1px solid #ccc", zIndex: 1000
        }}>
          <h3>Detalles de la Mesa {selectedMesa}</h3>
          {mesaDetails && mesaDetails.length > 0 ? (
            <ul>
              {mesaDetails.map((person, index) => (
                <li key={index}>{person.nombre} (Silla: {person.silla})</li>
              ))}
            </ul>
          ) : (
            <p>No hay registros para esta mesa.</p>
          )}
          <button onClick={closePopup}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
