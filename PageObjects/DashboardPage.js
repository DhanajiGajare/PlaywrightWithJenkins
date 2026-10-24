class DashboardPage
{

   constructor(page)
   {
      this.page=page;

      this.products=page.locator(".card-body");
      this.allProduct=page.locator(".card-body b");
      this.cardButton=page.locator("button[routerlink='/dashboard/cart']");
      
     
   }

   async searchProductAndAddToCart(productName)
   {
      await this.products.first().waitFor();

      const productTitle =await this.allProduct.allTextContents();

      await console.log(productTitle);

      const count=await productTitle.length;

      for(let i=0;i<count;++i)
      {

         if(await this.products.nth(i).locator("b").textContent()===productName)
         {
               console.log(await this.products.nth(i).locator("b").textContent());
               await this.products.nth(i).locator("text= Add To Cart").click();
               break;
         }

      }
   }

   async goToCartPage()
   {

        await this.cardButton.click();
 
   }



}

module.exports={DashboardPage};