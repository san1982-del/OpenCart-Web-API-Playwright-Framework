import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage{

   private readonly searchResult: Locator;
   
    constructor(page:Page){
        super(page)
        this.searchResult = page.locator('div.product-layout');
       
    }

    async getProductResultCount(): Promise<number>{
        return await this.searchResult.count();
    }

    async selectProduct(productname:string):Promise<void>{
        await this.page.getByRole('link', {name:productname}).first().click();
}
   
}
