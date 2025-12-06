
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Use the provided key directly to ensure it works on Vercel without environment variable setup
  const apiKey = "AIzaSyAHDCiiqqwjHhoM_gn4iIxq4MzBKN8PU5s"; 
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
    },
  };
});
