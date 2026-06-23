
import { expect, test } from "../src/fixtures/pagefixtures";
import { csvHelper } from "../src/utils/CSVHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach('Setup', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})

test('validate Title Test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    expect(pageTitle).toBe('Account Login');
})

test('forgot pwd link exist Test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
})

test('Login Application Test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    expect(await homePage.getHomePageTitle()).toBe('My Account');
})

//Data Driven Approach Test For Invalid Login using CSV Helper
let csvTestData = csvHelper.readCsv('src/data/loginData.csv');
for (let row of csvTestData) {
    test(`Login Application Test DD - ${row.username} : ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidLogin()).toBeTruthy();
    })
}

//Data Driven Approach Test For Invalid Login using JSON Helper
let jsonTestData = JsonHelper.readJson('src/data/loginData.json');
for (let row of jsonTestData) {
    test(`Login Application Test DD with JSON - ${row.username} : ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidLogin()).toBeTruthy();
    });
};


