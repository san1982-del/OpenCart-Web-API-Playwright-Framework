

import { expect, test } from "../src/fixtures/pagefixtures";
import { csvHelper } from "../src/utils/CSVHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach('Setup', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
})

test('Verify Search Result Count Test', async ({ homePage, searchResultsPage }) => {
    await homePage.doSearch('macbook');
    expect(await searchResultsPage.getProductResultCount()).toBe(3);
})


let productTestData = csvHelper.readCsv('src/data/product.csv')
for(let row of productTestData){
test(`Verify user is able to land on product page - ${row.productname}`, async ({ page, homePage, searchResultsPage }) => {
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
})
}