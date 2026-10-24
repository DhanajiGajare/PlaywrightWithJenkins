class CartPage
{
   constructor(page)
   {
    this.page=page;
     this.Product=page.locator("div[class='cartSection'] h3");
     this.checkout=page.locator("text=Checkout");
    
   }

   async verifyProductIdDisplayedAndCheckout(productName)
   {
       this.confirmProduct=await this.Product.textContent();
       if(this.confirmProduct===productName)
       {
           await this.checkout.click();
       }

   }



}

module.exports={CartPage};