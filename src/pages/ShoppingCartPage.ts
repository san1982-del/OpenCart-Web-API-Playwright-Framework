import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ShoppingCartPage extends BasePage{
    private readonly cartTable:Locator;


    constructor(page:Page){
        super(page);
        this.cartTable = page.locator('.table-responsive').locator('tr');

    }

    async getCartTableRowCount():Promise<number>{
        return await this.cartTable.count();
    }

    async getShoppingCartRowData(){
        let rowCount = await this.getCartTableRowCount();
        for(let i=1; i<rowCount; i++){
            let rowLocator = this.page.locator('.table-responsive').locator('tr').nth(i).locator('td');
            let productData = await rowLocator.allInnerTexts();
            for(let data of productData){
            console.log(data);
            }
        }  
    }
}