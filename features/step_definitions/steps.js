const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../PageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
Given('A Login to ECommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (userEmail, password) {

    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin(userEmail, password);
});
When('I add {string} to the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});
Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.verifyCheckout();
});
When('Enter Validations and Place the Order', async function () {
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});
Then('Verify Order is displayed in Order DetailsPage', async function () {
    await this.ordersReviewPage.navigateToOrdersPage();
    const ordersDetailPage = this.poManager.getordersDetailPage();
    await ordersDetailPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId).toContain(await ordersDetailPage.getOrderId());
});

Given('A Login to ECommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username')
    const signIn = this.page.locator('#signInBtn')
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css- type and fill to enter
    await userName.fill(username)
    await this.page.locator("[name='password']").fill(password);
    await signIn.click();
    console.log(await this.page.locator("[style*='block']").textContent());
    //assertion
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
Then('Verify Error Message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    //assertion
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});