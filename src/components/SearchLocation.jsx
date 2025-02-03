// src/components/SearchLocation.jsx
import React, { useState, useEffect } from "react";
import { fetchSearchSuggestions, fetchSearchDetail } from "../services/api";

const SearchLocation = ({ sheetId, setResultData }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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

  const handleSelect = async (suggestion) => {
    try {
      const data = await fetchSearchDetail(suggestion.nombre, sheetId);
      setResultData(data.result ? data : { error: data.error });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Búsqueda por Nombre</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setError(null);
        }}
        placeholder="Ingresa tu nombre o apellido"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((sugg, index) => (
            <li key={index} onClick={() => handleSelect(sugg)} style={{ cursor: "pointer" }}>
              {sugg.nombre} (Invitado {sugg.numeroInvitado})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchLocation;
