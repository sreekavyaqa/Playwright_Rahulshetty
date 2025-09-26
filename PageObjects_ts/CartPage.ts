//const{expect}=require('@playwright/test');
import { expect,type Locator, type Page } from '@playwright/test';
export class CartPage{
    page:Page;
    cartProducts:Locator;
    checkout:Locator;
    constructor(page:Page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3").first();
        this.checkout=page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName:string){
        await this.cartProducts.waitFor();
        const bool=await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }


     getProductLocator(productName:string){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async verifyCheckout(){
        await this.checkout.click();
    }
}
module.exports={CartPage};