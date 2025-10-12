import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Exclude test files from build
        /\.test\.(ts|tsx)$/,
        /\.spec\.(ts|tsx)$/,
        /setupTests\.ts$/,
        /vitest\.config\.ts$/,
      ],
    },
  },
});