
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './specs',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]  
  ],
});
