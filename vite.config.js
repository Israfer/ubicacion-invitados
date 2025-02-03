import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Configuración para dividir manualmente el código
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Si el módulo proviene de node_modules, lo agrupamos en un chunk llamado "vendor"
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Ajusta el límite de advertencia a 600 kB (o el valor que consideres apropiado)
    chunkSizeWarningLimit: 600
  },
  resolve: {
    alias: {
      "react/jsx-runtime": "react/jsx-runtime",
      "react/jsx-dev-runtime": "react/jsx-dev-runtime"
    }
  }
});
