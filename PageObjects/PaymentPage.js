class PaymentPage
{
    constructor(page)
    {
        this.page=page;
        this.inputCountryField=page.locator("input[class='input txt text-validated']").last();
        this.countryDropdown=page.locator(".ta-results");
        this.orderSubmitButton=page.locator(".action__submit");

    }

    async selectTheCountry(enterCountryName,countryName)
    {

        await this.inputCountryField.pressSequentially(enterCountryName);
        await this.countryDropdown.waitFor();

        //const optionsCount=await this.countryDropdown.count();

        const options=this.countryDropdown.locator("button");

        const optionsCount=await options.count();


        let text;

        for(let i=0;i<optionsCount;++i)
        {
            
            
            text=await options.nth(i).textContent();

            console.log(text);

            if(text===countryName)
            {
                await options.nth(i).click();
                break;
            }
            
        }
    }

   async placeTheOrder()
    {
        await this.orderSubmitButton.click();
    }


}

module.exports={PaymentPage};