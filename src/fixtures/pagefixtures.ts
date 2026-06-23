
import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { csvHelper } from "../utils/CSVHelper";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { BasePage } from "../pages/BasePage";


type PageFixtures = {
    basePage:BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage: RegisterPage;
    searchResultsPage:SearchResultsPage;
    productInfoPage:ProductInfoPage;
    shoppingCartPage:ShoppingCartPage;
    loginTestData: Record<string, string>[];
}
//extend() function add custom fixtures to Playwright
export let test = baseTest.extend<PageFixtures>({
    // use is a special Playwright callback. It passes the fixture object to the test.
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);//Provide this loginPage object to any test that requests it
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);//Provide this loginPage object to any test that requests it
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
     searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },
      productInfoPage: async ({ page }, use) => {
        const productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
      shoppingCartPage: async ({ page }, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },

    loginTestData: async ({ }, use) => {
        let loginTestData = csvHelper.readCsv('src/data/loginData.csv');
        await use(loginTestData);
    }


});

export { expect } from "@playwright/test";