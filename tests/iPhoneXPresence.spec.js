const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { DashBoardPage } = require('../PageObjects/DashBoardPage');

test.describe('iPhone X Product Presence', () => {
  test('should login and verify iPhone X is present in shop', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Step 2: Enter username and password
    const loginPage = new LoginPage(page);
    await loginPage.login('rahulshettyacademy', 'learning');

    // Step 3: Select checkbox
    await loginPage.checkUserAgreement();

    // Step 4: Click on Sign In button and wait for navigation to shop page
    await Promise.all([
      page.waitForURL('**/angularpractice/shop', { timeout: 15000 }),
      loginPage.clickSignIn()
    ]);

  // Assert we are on the shop page
  expect(page.url()).toContain('/angularpractice/shop');

  // Wait for the shop page to load by waiting for a product element to be visible
  await page.locator('.card-body b').first().waitFor({ state: 'visible', timeout: 10000 });

  // Step 5: Verify iPhone X is present
  const dashBoardPage = new DashBoardPage(page);
  const productTitles = await dashBoardPage.getProductTitles();
  const hasIphoneX = productTitles.some(title => title.toLowerCase().includes('iphone x'));
  expect(hasIphoneX).toBeTruthy();
  });
});
