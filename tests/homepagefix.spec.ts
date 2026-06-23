import { expect, test } from "../src/fixtures/pagefixtures";

test.beforeEach('Setup', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
})

test('validate Title Test', async ({ homePage }) => {
    const pageTitle = await homePage.getHomePageTitle();
    expect(pageTitle).toBe('My Account');
})

test('Perform Search Test', async ({ basePage }) => {
    await basePage.doSearch('macbook');
})


test('All Header Validation Test', async ({ homePage }) => {
    console.log('Home page headers : ', await homePage.getAllHeaders());
    expect((await homePage.getAllHeaders())).toHaveLength(4);
    expect(await homePage.getAllHeaders()).toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
})



