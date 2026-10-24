// @ts-check
//import { defineConfig, devices } from '@playwright/test';

const { trace } = require("node:console");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config={
  testDir: './tests',

  // retries: 1,
   
  timeout: 60*1000,

  expect:{
       timeout:5*1000
  },

  reporter: [
  ['list'],
  ['html', {
    outputFolder: 'playwright-report',
    open: 'never'
  }]
],
  
  use: {

         browserName:'chromium',
         headless: Boolean(process.env.CI),
         screenshot: 'only-on-failure',
         trace: 'retain-on-failure', 
         video: 'retain-on-failure'
  },     

};

module.exports=config;
