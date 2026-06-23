
import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
//private Locators
private readonly emailid: Locator;
private readonly password: Locator;
private readonly forgottenPasswordLink: Locator;
private readonly loginButton: Locator;
private readonly logo: Locator;
private readonly InvalidLoginErrorMessage: Locator;

//constructor.. of the class: init the locators
constructor(page:Page){
    super(page)
    this.emailid = page.getByRole('textbox', {name: 'E-Mail Address'});
    this.password = page.getByRole('textbox', {name: 'Password'});
    this.forgottenPasswordLink = page.getByRole('link', {name: 'Forgotten Password'}).first();
    this.loginButton = page.getByRole('button', {name: 'Login'});
    this.logo = page.getByAltText('naveenopencart');
    this.InvalidLoginErrorMessage = page.locator('.alert');
}

//public page actions(methods)/behaviour

async goToLoginPage(): Promise<void>{
    await this.page.goto('/opencart/index.php?route=account/login');
}

async getLoginPageTitle(): Promise<string>{
    return await this.page.title();
}

async isForgotPwdLinkExist(): Promise<boolean>{
    return await this.forgottenPasswordLink.isVisible();
}

async invalidLogin(){
    return await this.InvalidLoginErrorMessage.isVisible();
}

async doLogin( username: string, pwd: string ): Promise<void>{
    console.log(`User Credentials: ${username} : ${pwd}`);
    await this.emailid.fill(username);
    await this.password.fill(pwd);
    await this.loginButton.click();
}

}