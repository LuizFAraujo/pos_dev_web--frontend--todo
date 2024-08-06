import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,          // Porta do servidor de desenvolvimento
    // host: true,        // Permite conexões externas (0.0.0.0) (mesmo que -- host em scripts)
    // hmr: true,         // Habilita o Hot Module Replacement
  },
  build: {
    outDir: 'dist',   // Diretório de saída para a construção
  },
});
