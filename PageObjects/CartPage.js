const{expect}=require('@playwright/test');
class CartPage{
    constructor(page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3").first();
        this.checkout=page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName){
        await this.cartProducts.waitFor();
        const bool=await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }


     getProductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async verifyCheckout(){
        await this.checkout.click();
    }
}
module.exports={CartPage};