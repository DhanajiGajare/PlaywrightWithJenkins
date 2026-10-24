const { CartPage } = require("./CartPage");
const { ConfirmationPage } = require("./ConfirmationPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderPage } = require("./OrderPage");
const { PaymentPage } = require("./PaymentPage");

class PageObjectManager
{

    constructor(page)
    {

          this.loginPage=new LoginPage(page);
          this.dashboardPage=new DashboardPage(page);
          this.cartPage=new CartPage(page);
          this.paymentPage=new PaymentPage(page);
          this.confirmationPage=new ConfirmationPage(page);
          this.orderPage=new OrderPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getPaymentPage()
    {
        return this.paymentPage;
    }

    getConfirmationPage()
    {
        return this.confirmationPage;
    }

    getOrderPage()
    {
        return this.orderPage;
    }


}

module.exports={PageObjectManager};