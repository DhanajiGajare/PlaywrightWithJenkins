const {test, expect}=require('@playwright/test');

test('E2E client app flow', async ({browser})=>
{

const context=await browser.newContext();
const page=await context.newPage();

const productName="ADIDAS ORIGINAL";

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill("d1122@gmail.com");
await page.locator("#userPassword").fill("Test@123");
await page.locator("#login").click();

const products=page.locator(".card-body");

await page.waitForLoadState("networkidle");

await page.locator(".card-body b").first().waitFor();

const productTitle=page.locator(".card-body b").allTextContents();

console.log(productTitle);


const count=await products.count();

for(let i=0;i<count;++i)
{

     if(await products.nth(i).locator("b").textContent()===productName)
     {
          console.log(await products.nth(i).locator("b").textContent());
          await products.nth(i).locator("text= Add To Cart").click();
          break;
     }

}

await page.locator("button[routerlink='/dashboard/cart']").click();

const confirmProduct=await page.locator("div[class='cartSection'] h3").textContent();

if(confirmProduct===productName)
{
     await page.locator("text=Checkout").click();
}

await page.locator("input[class='input txt text-validated']").last().pressSequentially("Ind");

const dropDown=page.locator(".ta-results");

await dropDown.waitFor();

const optionsCount=await dropDown.locator("button").count();

let text;

for(let i=0;i<optionsCount;++i)
{
     text=await dropDown.locator("button").nth(i).textContent();

     if(text===" India")
     {
          await dropDown.locator("button").nth(i).click();
          break;
     }
       
}

await page.locator(".action__submit").click();
 
await page.locator(".hero-primary").waitFor();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

let productId=await page.locator("table[align='center']").last().locator("tr").last().textContent();

productId = productId?.trim().split(/\s+/)[1];

console.log(productId);

await page.locator("button[routerlink='/dashboard/myorders']").click();

await page.locator("table[class*='table-bordered']").waitFor();

const allProducts=await page.locator("table[class*='table-bordered']").locator("tbody").locator("tr");

const productsCounts=await allProducts.count();

for(let i=0;i<productsCounts;++i)
{
    const text2= await allProducts.nth(i).locator("th").textContent();
    if (text2.includes(productId))
    {
         await allProducts.nth(i).locator("button:has-text('View')").click();
         break;
    }
}

await expect(page.locator("div.col-md-6 div[class='col-text -main']")).toHaveText(productId);

await page.locator("button[routerlink='/dashboard/myorders']").click();

for(let i=0;i<productsCounts;++i)
{
    const text2= await allProducts.nth(i).locator("th").textContent();
    if (text2.includes(productId))
    {
         await allProducts.nth(i).locator("button:has-text('delete')").click();
         break;
    }
}

});
