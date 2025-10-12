/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // ✅ enables test(), expect(), vi without import
    environment: 'jsdom',   // ✅ needed for React Testing Library
    setupFiles: './vitest.setup.js', // optional setup file (see below)
  },
});
