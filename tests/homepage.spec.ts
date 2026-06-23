
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { expect, test } from "@playwright/test"

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach('Setup', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin("sandeepdahiya@yahoo.com", "Selenium@12345");
    homePage = new HomePage(page);
})

test('validate Title Test', async ({ page }) => {
    const pageTitle = await homePage.getHomePageTitle();
    expect(pageTitle).toBe('My Account');
})


test('All Header Validation Test', async ({ page }) => {
    expect((await homePage.getAllHeaders()).length).toBe(4);
    console.log(await homePage.getAllHeaders());
    expect(await homePage.getAllHeaders()).toStrictEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
})



