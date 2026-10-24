// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

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

  //retries: 1,
   
  timeout: 30*1000,

  expect:{
       timeout:5*1000
  },

  reporter:'html',
  projects:[
    {

    name:'safari',
    use:
    {
         browserName: 'webkit',
         headless: false,
         screenshot: 'off',
         video: 'retain-on-failure',
         trace:'on',
         // it support when occure SSL Certificate related issue it gives all permissions 
         ignoreHttpsErrors: true,
         // it helps when occure location related popups and it is handle automatically
         permission:['geolocation'],
         // if we want to perform execution in device level 
        //  ...devices['iPhone 13']
    }
  },

  {
     name: 'chrome',

     use:
     {
         browserName:'chromium',
         headless: false,
         screenshot: 'off',
         trace:'on' ,
         //viewport:{width: 1000, height: 1000}



     }



    }

  ],
  
};

module.exports=config;

