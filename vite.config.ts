/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />
/// <reference types="vitest" />
import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import codegen from 'vite-plugin-graphql-codegen';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), codegen()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      exclude: ['src/__generated__'],
    },
  },
} as UserConfig);
