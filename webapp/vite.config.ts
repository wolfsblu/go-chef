import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  envDir: './..',
  plugins: [svelte()],
  server: {
    host: '127.0.0.1'
  }
})
