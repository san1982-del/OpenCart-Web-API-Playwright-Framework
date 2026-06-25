
import { LoginPage } from "../src/pages/LoginPage";
import {expect, test} from "@playwright/test"

let login:LoginPage;

test.beforeEach('Setup', async ({page})=>{
login = new LoginPage(page);
await login.goToLoginPage();
})

test.skip('validate Title Test', async ({ page })=>{
const pageTitle = await login.getLoginPageTitle();
expect(pageTitle).toBe('Account Login');
})

test.skip('forgot pwd link exist Test', async ({ page })=>{
expect(await login.isForgotPwdLinkExist()).toBeTruthy();
})

test.skip('Login Application Test', async ({ page })=>{
await login.doLogin('sandeepdahiya@yahoo.com', 'Selenium@12345')
expect(await page.title()).toBe('My Account');
})





