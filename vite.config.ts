import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the same build works at username.github.io/star/ and on a local file server.
  base: './',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
