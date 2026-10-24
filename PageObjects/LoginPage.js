class LoginPage
{
    constructor(page)
    {
        this.page=page;
        this.userName=page.locator("#userEmail");
        this.password=page.locator("#userPassword");
        this.signInButton=page.locator("#login");
    }

    async goToApplication()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async LoginApplication(email,pass)
    {
        await this.userName.fill(email);
        await this.password.fill(pass);
        await this.signInButton.click();
   
         await this.page.waitForLoadState("networkidle");
        

    }
    
}

module.exports={LoginPage};