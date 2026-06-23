
import { expect, test } from "../src/fixtures/pagefixtures";
import { csvHelper } from "../src/utils/CSVHelper";


test.beforeEach('Setup', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
})


test('get Cart row data Test', async ({ homePage, shoppingCartPage }) => {
    await homePage.doSearch('macbook');
    await homePage.gotoShoppingCartPage();
    await shoppingCartPage.getShoppingCartRowData();
})
