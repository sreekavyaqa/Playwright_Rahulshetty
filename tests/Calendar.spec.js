const {test,expect}=require('@playwright/test');
test("Calendar Validations",async({page})=>{
    const monthNum=4;
    const date=15;
    const year=2026;
    const expectedList=[year,monthNum,date];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNum-1)).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const inputs=page.locator(".react-date-picker__inputGroup input");
    for(let i=0;i<expectedList.length;i++){
const value = await inputs.nth(i).getAttribute("value");
expect(parseInt(value)).toEqual(expectedList[i]);
    }
})