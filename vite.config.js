import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        assetFileNames: (asset) => {
          // Preserve anonymous event photo URLs from the approved gallery.
          if (
            asset.originalFileNames.some((name) => name.replaceAll('\\', '/').includes('/events/'))
          ) {
            return 'assets/moment-[hash][extname]';
          }
          return asset.names.some((name) => name.endsWith('.mp4'))
            ? 'assets/playpop-video-[hash][extname]'
            : 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
