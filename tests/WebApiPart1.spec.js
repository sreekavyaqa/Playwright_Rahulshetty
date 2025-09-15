const{test,expect,request}=require('@playwright/test');

const loginPayload={userEmail: "harekrishna@gmail.com",
  userPassword: "Test@123"}
const orderPayload={country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a"}
let token;
let orderId;

test.beforeAll(async()=>{
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test('Place the Order', async ({page}) => {
    // Set token in localStorage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody tr");
    if (await rows.count() > 0) {
        // Click on the first order's view button
        await rows.first().locator("button").first().click();
        
        // Verify we're on the order details page
        await page.locator('.col-text').waitFor();
        const orderIdDetails = await page.locator('.col-text').textContent();
        console.log('Order details:', orderIdDetails);
        expect(orderIdDetails).toBeTruthy();
    } else {
        console.log('No orders found in the table');
    }
}); 