


import { expect, test } from "../src/fixtures/pagefixtures";
import { csvHelper } from "../src/utils/CSVHelper";


test.beforeEach('Setup', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
})


let productTestData = csvHelper.readCsv('src/data/product.csv')
for(let row of productTestData){
test(`Product Info Validation Test - ${row.productname}`, async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    let actualProductData = await productInfoPage.getProductInfo();
    console.log(actualProductData);
    expect.soft(actualProductData.get('Brand')).toBe(row.brand);
    expect.soft(actualProductData.get('Product Code')).toBe(row.productcode);
    expect.soft(actualProductData.get('Reward Points')).toBe(row.rewardpoints);
    expect.soft(actualProductData.get('Availability')).toBe(row.availability);
    expect.soft(actualProductData.get('Price Key')).toBe(row.price);
    expect.soft(actualProductData.get('Ex Tax')).toBe(row.extax);
    })
}

for(let row of productTestData){
test(`Perform Add to cart Test - ${row.searchkey} : ${row.productname}`, async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    let successMessage = await productInfoPage.doAddToCart();
    expect(successMessage).toContain(`Success: You have added ${row.productname} to your shopping cart!`);
  })
}