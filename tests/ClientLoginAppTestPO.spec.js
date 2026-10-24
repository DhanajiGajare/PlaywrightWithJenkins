const {test, expect}=require('@playwright/test');
/*
const {LoginPage}=require('../PageObjects/LoginPage');
const{DashboardPage}=require('../PageObjects/DashboardPage');
const {CartPage}=require('../PageObjects/CartPage');
const {PaymentPage}=require('../PageObjects/PaymentPage');
const {ConfirmationPage}=require('../PageObjects/ConfirmationPage');
const {OrderPage}=require('../PageObjects/OrderPage');
*/

const {PageObjectManager}=require('../PageObjects/PageObjectManager');
// we can directly parse data from json file to javascript object but if data in encoded format then this way will fail.
//const dataset=JSON.parse(require('../utils/ClientLoginAppTestPOTestData.json'));

// so better way to write like this way  Josn -> string -> javaScript object

const dataset=JSON.parse(JSON.stringify(require('../utils/ClientLoginAppTestPOTestData.json')));

// if you want to run one test with dataSet we can do that first we need to create array in json file 
//we need to extract one by one json object through for loop

for(const data of dataset)
{

test(`E2E client app flow for ${data.productName}`, async ({browser,page})=>
{

    const pageObjectManager =new PageObjectManager(page);

  /*    
    const email="d1122@gmail.com";
    const password="Test@123";
    const productName="ZARA COAT 3";

   */

/*
    const context=await browser.newContext();
    const page=await context.newPage();
*/
    

    const loginPage=pageObjectManager.getLoginPage();
    await loginPage.goToApplication();
    await loginPage.LoginApplication(data.email,data.password);

    const dashboardPage=pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.productName);

    await dashboardPage.goToCartPage();

    const cartPage=pageObjectManager.getCartPage();
    await cartPage.verifyProductIdDisplayedAndCheckout(data.productName);

    const paymentPage=pageObjectManager.getPaymentPage();
    await paymentPage.selectTheCountry("Ind"," India");
    await paymentPage.placeTheOrder();

    const confirmationPage=pageObjectManager.getConfirmationPage();
    const {message,proId}=await confirmationPage.verifyConfirmOrder();

    await expect(message.trim()).toBe("Thankyou for the order.");

    confirmationPage.gotoOrderPage();
    const orderPage=pageObjectManager.getOrderPage();
    await orderPage.verifyOrderProduct(proId);

    await expect(page.locator("div.col-md-6 div[class='col-text -main']")).toHaveText(proId);

    await confirmationPage.gotoOrderPage();
    await orderPage.deleteOrder(proId);

});

}

/*

 this test is for the single dataset

test('E2E client app flow', async ({browser,page})=>
{

    const pageObjectManager =new PageObjectManager(page);

  
    const email="d1122@gmail.com";
    const password="Test@123";
    const productName="ZARA COAT 3";

   

    const context=await browser.newContext();
    const page=await context.newPage();
   
    

    const loginPage=pageObjectManager.getLoginPage();
    await loginPage.goToApplication();
    await loginPage.LoginApplication(dataset.email,dataset.password);

    const dashboardPage=pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(dataset.productName);

    await dashboardPage.goToCartPage();

    const cartPage=pageObjectManager.getCartPage();
    await cartPage.verifyProductIdDisplayedAndCheckout(dataset.productName);

    const paymentPage=pageObjectManager.getPaymentPage();
    await paymentPage.selectTheCountry("Ind"," India");
    await paymentPage.placeTheOrder();

    const confirmationPage=pageObjectManager.getConfirmationPage();
    const {message,proId}=await confirmationPage.verifyConfirmOrder();

    await expect(message.trim()).toBe("Thankyou for the order.");

    confirmationPage.gotoOrderPage();
    const orderPage=pageObjectManager.getOrderPage();
    await orderPage.verifyOrderProduct(proId);

    await expect(page.locator("div.col-md-6 div[class='col-text -main']")).toHaveText(proId);

    await confirmationPage.gotoOrderPage();
    await orderPage.deleteOrder(proId);

});

*/
