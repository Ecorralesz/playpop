import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Keep private event folder/filename labels out of public asset URLs.
        assetFileNames: (asset) =>
          asset.originalFileNames.some((name) => name.replaceAll('\\', '/').includes('/events/'))
            ? 'assets/moment-[hash][extname]'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
});
