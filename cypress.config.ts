import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 's4bftt',
  e2e: {
    baseUrl: 'http://localhost:4200/',
    setupNodeEvents(_on, config) {
      return {
        ...config,
        browsers: config.browsers.filter((b) => b.family === 'chromium' && b.name !== 'electron'),
      };
    },
  },
});
