import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly quantity: Locator;
    private readonly addToCart: Locator;
    private readonly addToCartSuccessMessage;
    private map: Map<string, string | number>;

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.quantity = page.getByRole('textbox', { name: 'Qty' });
        this.addToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.addToCartSuccessMessage = page.getByText('Success: You have added');
        this.map = new Map<string, string | number>();
    }

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductPageImagesCount(): Promise<number> {
        return await this.productImages.count();
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.map;
    }

    private async getProductMetaData(): Promise<void> {
        await this.productMetaData.first().waitFor({ state: "visible" });
        let metaData = await this.productMetaData.allTextContents();
        console.log(metaData);
        for (let data of metaData) {
            let splitData = data.split(':');
            let metaDataKey = splitData[0].trim();
            let metaDataValue = splitData[1].trim();
            this.map.set(metaDataKey, metaDataValue);
        }
    }

    private async getProductPriceData(): Promise<void> {
        await this.productPricing.first().waitFor({ state: "visible" });
        let priceData = await this.productPricing.allTextContents();
        this.map.set('Price Key', priceData[0].trim());
        let exPriceDataValue = priceData[1].split(':');
        this.map.set(exPriceDataValue[0].trim(), exPriceDataValue[1].trim());
    }

    async doAddToCart(): Promise<string> {
        await this.quantity.clear();
        await this.quantity.fill('2');
        await this.addToCart.click();
        let successMessage = await this.addToCartSuccessMessage.innerText();
        console.log(successMessage);
        return successMessage;
        await this.page.pause();
    }

}