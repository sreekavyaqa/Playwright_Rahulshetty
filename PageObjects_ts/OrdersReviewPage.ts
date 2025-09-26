import { expect,type Locator, type Page } from '@playwright/test';
export class OrdersReviewPage{
    page:Page;
    country:Locator;
    dropdown:Locator;
    emailLocator:Locator;
    submit:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;
    myOrders:Locator;
    constructor(page:Page){
        this.page=page;
        this.country=page.locator("[placeholder*='Select Country']");
        this.dropdown=page.locator(".ta-results");
        this.emailLocator=page.locator(".mt-5 [type='text']").first();
        this.submit=page.locator(".action__submit");
        this.orderConfirmationText=page.locator(".hero-primary");
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders=page.locator("button[routerlink*='myorders']");
    }

    async searchCountryAndSelect(countryCode:string,countryName:string){
        await this.country.pressSequentially(countryCode,{delay:100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i=0;i<optionsCount;++i){
            let text:any;
            text=await this.dropdown.locator("button").nth(i) .textContent(); 
            if(text.trim()===countryName){
                await this.dropdown.locator("button").nth(i).click();
                break;
            }   
        }       
    }
    async verifyEmailId(userEmail:string){
    await expect(this.emailLocator).toHaveText(userEmail);
    }
    async submitAndGetOrderId(){
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
    async navigateToOrdersPage(){
      await this.myOrders.click();

    }
}
module.exports={OrdersReviewPage};