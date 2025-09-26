const playwright = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
const { Before ,After,BeforeStep,AfterStep,Status} = require('@cucumber/cucumber');
Before(async function () {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});
BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});
AfterStep(async function ({result}) {
 if(result.status===Status.FAILED){
  await this.page.screenshot({path:'screenshots/screenshot1.png'});
 }
});
After(async function () {
 console.log("I am the last one to execute");
});
