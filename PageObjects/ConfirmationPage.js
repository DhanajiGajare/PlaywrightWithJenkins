class ConfirmationPage
{

     constructor(page)
     {
        this.confirmationMessage=page.locator(".hero-primary");
        this.productId=page.locator("table[align='center']").last().locator("tr").last();
        this.orderPage=page.locator("button[routerlink='/dashboard/myorders']");

     }


    async verifyConfirmOrder()
    {

       await this.confirmationMessage.waitFor();

       const message=await this.confirmationMessage.textContent();

       const productId=await this.productId.textContent();

       const proId=await productId?.trim().split(/\s+/)[1];

       console.log(proId);

       return {
         message,
         proId
       }; 

    }

    async gotoOrderPage()
    {
        await this.orderPage.click();
    }


}

module.exports={ConfirmationPage};