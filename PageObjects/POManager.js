const {DashBoardPage}=require('./DashBoardPage');
const {LoginPage}=require('./LoginPage');
const {CartPage}=require('./CartPage');
const {OrdersReviewPage}=require('./OrdersReviewPage');
const {OrdersDetailPage}=require('./OrdersDetailPage');
class POManager{
         
    constructor(page){
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