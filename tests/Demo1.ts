import { expect, type Locator, type Page } from '@playwright/test';
let message2:string="Hello";
 message2="World";
 let age2:number=20;
 let isActive:boolean= false;
 let numbers2:number[]=[1,2,3,4];
 let data:any="This could be anything";
data=42;
console.log( message2);
console.log(age2);
console.log(isActive);
console.log(numbers2);
console.log(data);
function add(a:number,b:number):number{
    return a+b;
}
add(3,4)
let user:{name:string,age:number,location:string} = {name:"Bob" , age : 34 , location : "Hyderabad"};
class CartPage{
    page:Page;
    cartProducts:Locator;
    checkout:Locator;
    constructor(page:Page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3").first();
        this.checkout=page.locator("text=Checkout");
    }

