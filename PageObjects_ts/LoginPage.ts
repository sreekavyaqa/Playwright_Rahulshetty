import{ expect, type Locator, type Page } from '@playwright/test';
export class LoginPage{
    page:Page;
    userEmail:Locator;
    userPassword:Locator;
    signInButton:Locator;
constructor(page:Page){
    this.page=page;
    this.userEmail=page.locator("#userEmail");
    this.userPassword=page.locator("#userPassword");
    this.signInButton=page.locator("[value='Login']");
}
async goToLoginPage(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}
//Reuasable uitility to login
async validLogin(userEmail:string,userPassword:string){
await this.userEmail.fill(userEmail);
await this.userPassword.fill(userPassword);
await this.signInButton.click(); 
await this.page.waitForLoadState('networkidle');
}
}
//To make the class as public and make sure to available to entire Framework,we use export
module.exports={LoginPage};
