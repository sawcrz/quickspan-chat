import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
})
