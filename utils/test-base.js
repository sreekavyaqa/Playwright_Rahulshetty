const base=require('@playwright/test');
exports.customtest=base.test.extend({
    testDataForOrder:
    {    
    userEmail : "harekrishna@gmail.com",
    password : "Test@123",
    productName : "ZARA COAT 3"
    }   
    
})
