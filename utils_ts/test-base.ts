//const base=require('@playwright/test');
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder{
    userEmail: string;
    password: string;
    productName: string;
}
export const customtest=baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder:
    {    
    userEmail : "harekrishna@gmail.com",
    password : "Test@123",
    productName : "ZARA COAT 3"
    }   
    
})
