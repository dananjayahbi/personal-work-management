import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allow access from mobile
    port: 3000,        // Change port to 3000
  },
});
