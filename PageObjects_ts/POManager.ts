import { expect,type Locator, type Page } from '@playwright/test';
//const {DashBoardPage}=require('./DashBoardPage');
//const {LoginPage}=require('./LoginPage');
//const {CartPage}=require('./CartPage');
//const {OrdersReviewPage}=require('./OrdersReviewPage');
//const {OrdersDetailPage}=require('./OrdersDetailPage');
import { LoginPage } from './LoginPage';
import { DashBoardPage } from './DashBoardPage';
import { CartPage } from './CartPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { OrdersDetailPage } from './OrdersDetailPage';
export class POManager{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    ordersDetailPage: OrdersDetailPage;      
    constructor(page: Page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.cartPage=new CartPage(this.page);
        this.ordersReviewPage=new OrdersReviewPage(this.page);
        this.ordersDetailPage=new OrdersDetailPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrdersReviewPage(){
        return this.ordersReviewPage;
    }
    getordersDetailPage(){
        return this.ordersDetailPage;
    }
}
module.exports={POManager};