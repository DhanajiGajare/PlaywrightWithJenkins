class OrderPage
{

    constructor(page)
    {
        this.waitloadProduct=page.locator("table[class*='table-bordered']");
        this.allProducts=page.locator("table[class*='table-bordered']").locator("tbody").locator("tr");
        this.orderId=page.locator("div.col-md-6 div[class='col-text -main']");
    }

    async verifyOrderProduct(productId)
    {
          await this.waitloadProduct.waitFor();
          const productCounts=await this.allProducts.count();

         for(let i=0;i<productCounts;++i)
        {
            const text= await this.allProducts.nth(i).locator("th").textContent();
            if (text.includes(productId))
            {
                 await this.allProducts.nth(i).locator("button:has-text('View')").click();
                 break;
            }
        }


    }


   async deleteOrder(productId)
   {

        const productsCount=await this.allProducts.count();
        for(let i=0;i<productsCount;++i)
        {
             const text= await this.allProducts.nth(i).locator("th").textContent();
             if (text.includes(productId))
             {
                 await this.allProducts.nth(i).locator("button:has-text('delete')").click();
                 break;
             }
        } 
   }



}

module.exports={OrderPage};