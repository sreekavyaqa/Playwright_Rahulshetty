class LoginPage{
constructor(page){
    this.page=page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('#signInBtn');
        this.userAgreementCheckbox = page.locator('#terms');
}
// Select the user agreement checkbox
async checkUserAgreement() {
    await this.userAgreementCheckbox.check();
}
// Click the sign in button
async clickSignIn() {
    await this.signInButton.click();
}
// For legacy login page (used in iPhoneXPresence.spec.js)
async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
}
async goToLoginPage(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}
//Reuasable uitility to login
async validLogin(userEmail,userPassword){
await this.userEmail.fill(userEmail);
await this.userPassword.fill(userPassword);
await this.signInButton.click(); 
await this.page.waitForLoadState('networkidle');
}
}
//To make the class as public and make sure to available to entire Framework,we use export
module.exports={LoginPage};
