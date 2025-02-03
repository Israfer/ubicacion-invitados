// src/components/Scanner.jsx
import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = ({ onScan }) => {
  const scannerContainerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  useEffect(() => {
    if (!scannerInstanceRef.current) {
      scannerInstanceRef.current = new Html5QrcodeScanner(
        "scanner",
        { fps: 10, qrbox: 250 },
        false
      );
      scannerInstanceRef.current.render(onScan);
    }
    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear().catch((error) => {
          console.error("Error al limpiar el scanner:", error);
        });
        scannerInstanceRef.current = null;
      }
    };
  }, [onScan]);

  return <div id="scanner" ref={scannerContainerRef} />;
};

export default Scanner;
