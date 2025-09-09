const{test, expect}=require('@playwright/test');
const { Console } = require('console');

test( 'Browser Context Playwright test',async ({browser})=>{
    //chrome - plugins / cookies
const context=await browser.newContext();
const page=await context.newPage();
const userName=page.locator('#username')
const signIn=page.locator('#signInBtn')
const cardTitles= page.locator(".card-body a")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
//css- type and fill to enter
await userName.fill("rahulshetty")
await page.locator("[name='password']").fill("learning")
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
//assertion
await expect(page.locator("[style*='block']")).toContainText('Incorrect')
//clear the text box
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);
}); 


test('UI Controls',async ({page})=>{
  
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName=page.locator('#username');
const signIn=page.locator('#signInBtn');
const doclink=page.locator("[href*='documents-request']");
const dropdown=page.locator("select.form-control");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();

console.log(await page.locator(".radiotextsty").last().isChecked());
//assertion
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
//await page.pause();
await expect(doclink).toHaveAttribute("class","blinkingText");

}); 

test('Child Windlow Handles ',async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const userName=page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const doclink=page.locator("[href*='documents-request']");
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),//listen for any new page- pending, rejected,fulfilled
        doclink.click(),
    ])
   const text= await newPage.locator(".red").textContent();
   const arrayText=text.split("@");
   const domain=arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue())
    //await page.pause();
});
