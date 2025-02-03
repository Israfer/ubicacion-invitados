// src/components/SearchLocation.jsx
import React, { useState, useEffect } from "react";
import { fetchSearchSuggestions, fetchSearchDetail } from "../services/api";

const SearchLocation = ({ sheetId }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length > 2) {
      fetchSearchSuggestions(query, sheetId)
        .then((data) => {
          setSuggestions(data.suggestions || []);
        })
        .catch((err) => setError(err.message));
    } else {
      setSuggestions([]);
    }
  }, [query, sheetId]);

  const handleSelect = async (sugg) => {
    try {
      const data = await fetchSearchDetail(sugg.nombre, sheetId);
      if (data.result) {
        setSelected(data.result);
      } else {
        setError("No se pudo obtener el detalle: " + (data.error || ""));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Búsqueda de Ubicación</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setError(null); setSelected(null); }}
        placeholder="Ingresa tu nombre o apellido"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {suggestions.length > 0 && !selected && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {suggestions.map((sugg, index) => (
            <li
              key={index}
              onClick={() => handleSelect(sugg)}
              style={{ cursor: "pointer", padding: "4px 0" }}
            >
              {sugg.nombre} (Invitado {sugg.numeroInvitado})
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div>
          <h3>Tu Ubicación</h3>
          <p><strong>Nombre:</strong> {selected.nombre}</p>
          <p><strong>Mesa:</strong> {selected.mesa}</p>
          <p><strong>Silla:</strong> {selected.silla}</p>
          <p><strong>Tipo:</strong> {selected.tipo}</p>
          <p><strong>Estado:</strong> {selected.estado}</p>
          {selected.companions && selected.companions.length > 0 && (
            <>
              <h4>Compañeros de Mesa</h4>
              <ul>
                {selected.companions.map((c, idx) => (
                  <li key={idx}>{c.nombre} (Invitado {c.numeroInvitado})</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
