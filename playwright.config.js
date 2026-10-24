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
   
  timeout: 30*1000,

  expect:{
       timeout:5*1000
  },

  reporter:'html',
  
  use: {

         browserName:'chromium',
         headless: Boolean(process.env.CI),
         screenshot: 'on',
         trace:'on' 
  },     

};

module.exports=config;
