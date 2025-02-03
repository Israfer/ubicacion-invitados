// src/components/QRImageUpload.jsx
import React, { useState } from "react";
import jsQR from "jsqr";

const QRImageUpload = ({ onScan }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No se seleccionó ningún archivo.");
      return;
    }
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = function(event) {
      const imageDataUrl = event.target.result;
      const image = new Image();
      image.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          onScan(code.data);
        } else {
          setError("No se pudo detectar un código QR en la imagen.");
        }
        setLoading(false);
      };
      image.onerror = function() {
        setError("Error al cargar la imagen.");
        setLoading(false);
      };
      image.src = imageDataUrl;
    };
    reader.onerror = function() {
      setError("Error al leer el archivo.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Subir imagen de QR</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default QRImageUpload;
