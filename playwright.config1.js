// @ts-check
import { defineConfig, devices } from '@playwright/test';

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
const config=({
  testDir: './tests',
  retries : 1,
  workers : 3,
timeout:30*1000,
expect:{
  timeout:5000,
},
reporter:'html',
projects:[
  {
    name :'safari',
use: {
    browserName :'webkit',
    headless : true,
    screenshot : 'on',
    trace :'on',//off on
    ...devices['iphone 12'],// is not web responsive
  }
  },

  {
    name : 'chrome',
use: {
    browserName :'chromium',
    headless : true,
    screenshot : 'on',
    trace :'retain-on-failure',
    video:'retain-on-failure',
    ignoreHttpsErrors:true,
    permissions:['geolocation']
  }
  }
 
]
 

});
module.exports=config

