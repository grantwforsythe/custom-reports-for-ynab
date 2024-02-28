import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // TODO: Set values based on environment
    baseUrl: 'http://localhost:4200/',
  },
});
