
import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

export class HomePage extends BasePage{
//private Locators
private readonly allHeaders: Locator;


//constructor.. of the class: init the locators
constructor(page:Page){
    super(page)
    this.allHeaders = page.getByRole('heading', {level: 2});
}

//public page actions(methods)/behaviour

async getHomePageTitle(): Promise<string>{
    return await this.page.title();
}

async getAllHeaders(): Promise<string[]>{
    return await this.allHeaders.allInnerTexts();
}


}

