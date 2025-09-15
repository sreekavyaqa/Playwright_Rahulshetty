const{test, expect}=require('@playwright/test');
const { Console } = require('console');

test( 'Client App Login',async ({page})=>{
    //chrome - plugins / cookies
const productName="ZARA COAT 3";
const products = page.locator(".card-body");
const email="harekrishna@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill("Test@123");
await page.getByRole("button",{value:"Login"}).click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click(); 
//const titles=await page.locator(".card-body b").allTextContents();
//console.log(titles);
// const count=await products.count();
// for(let i=0;i<count;++i){
// if(await products.nth(i).locator("b").textContent()===productName){
//     //add to cart
//     await products.nth(i).locator("text=Add To Cart").click();
//     break;   
// }
// }
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
await page.locator(".cartSection h3").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole("button",{name:"Checkout"}).click();
await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
await page.getByRole("button",{name:"India"}).nth(1).click();
await page.getByText("Place Order ").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
}); 


