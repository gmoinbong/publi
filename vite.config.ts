import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for root domain deployment
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    cssCodeSplit: false, // Single CSS file for better compatibility
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: undefined, // Prevent code splitting issues
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Ensure proper MIME types
    assetsInlineLimit: 0,
  },
  server: {
    fs: {
      strict: false,
    },
  },
});

