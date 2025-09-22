const{test,expect}=require('@playwright/test');
const {customtest}=require('../utils/test-base');
const { Console } = require('console');
//we are importing the login page from, if we want to go inside of the folder then ./
const {POManager}=require('../PageObjects/POManager');
//json->String->JSObject
const dataSet=JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));
for(const data of dataSet){
    test( `Client App Login for ${data.productName}`,async ({page})=>{
    //chrome - plugins / cookies
 const poManager=new POManager(page);
const products = page.locator(".card-body");
const loginPage=poManager.getLoginPage();
await loginPage.goToLoginPage();
await loginPage.validLogin(data.userEmail,data.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(data.productName);
await dashboardPage.navigateToCart();

const cartPage=poManager.getCartPage();
await cartPage.verifyProductIsDisplayed(data    .productName);
await cartPage.verifyCheckout();

const ordersReviewPage=poManager.getOrdersReviewPage();
await ordersReviewPage.searchCountryAndSelect("ind","India");
const orderId= await ordersReviewPage.submitAndGetOrderId();
console.log(orderId);

await ordersReviewPage.navigateToOrdersPage();
const ordersDetailPage=poManager.getordersDetailPage();
await ordersDetailPage.searchOrderAndSelect(orderId);
expect(orderId).toContain(await ordersDetailPage.getOrderId());
//await page.pause();
}); 
}


customtest( `@Web Client App Login for custom`,async ({page,testDataForOrder})=>{
    //chrome - plugins / cookies
 const poManager=new POManager(page);
const products = page.locator(".card-body");
const loginPage=poManager.getLoginPage();
await loginPage.goToLoginPage();
await loginPage.validLogin(testDataForOrder.userEmail,testDataForOrder.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(testDataForOrder.productName);
await dashboardPage.navigateToCart();

const cartPage=poManager.getCartPage();
await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
await cartPage.verifyCheckout();

const ordersReviewPage=poManager.getOrdersReviewPage();
await ordersReviewPage.searchCountryAndSelect("ind","India");
const orderId= await ordersReviewPage.submitAndGetOrderId();
console.log(orderId);

await ordersReviewPage.navigateToOrdersPage();
const ordersDetailPage=poManager.getordersDetailPage();
await ordersDetailPage.searchOrderAndSelect(orderId);
expect(orderId).toContain(await ordersDetailPage.getOrderId());
//await page.pause();
}); 
//test files will trigger in parllel, but individual tests in sequence

