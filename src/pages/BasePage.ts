import { Locator, Page } from "@playwright/test";

export class BasePage{

    protected readonly page:Page;
    private readonly shoppingcartIcon:Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.shoppingcartIcon = page.getByTitle('Shopping Cart');
        this.search = page.getByPlaceholder('Search', {exact:true});
        this.searchIcon = page.locator('.fa-search');
    }

    //helper/generic
    
    async gotoShoppingCartPage(){
        await this.shoppingcartIcon.click();
    }

    async doSearch(searchKey:string):Promise<void>{
    console.log(`Search Key: ${searchKey}`);
    await this.search.fill(searchKey);
    await this.searchIcon.click();
    }
 
}