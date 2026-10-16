import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './Test',
  outputDir: 'test-results',
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
      launchOptions: {
      slowMo: 300, // Delays each action by 300 milliseconds
    },

  },
});