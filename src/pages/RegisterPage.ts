
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class RegisterPage extends BasePage {

    //private Locators
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly emailid: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordConfirm: Locator;
    private readonly subscribeYes: Locator;
    private readonly continue: Locator;
    private readonly privacyPolicyCheckBox: Locator;
    private readonly existingCustomerErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.emailid = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.passwordConfirm = page.getByPlaceholder('Password Confirm', { exact: true });
        this.subscribeYes = page.getByRole('radio', { name: 'Yes' });
        this.privacyPolicyCheckBox = page.getByRole('checkbox');
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.existingCustomerErrorMessage = page.locator('.alert');
    }

    async goToRegisterPage(): Promise<void> {
        await this.page.goto('/opencart/index.php?route=account/register');
    };

    async registerCustomer(firstname: string, lastname: string, email: string, telephone: string, password: string, confirmpassword: string): Promise<void> {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.emailid.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordConfirm.fill(confirmpassword);
        await this.subscribeYes.click();
        await this.privacyPolicyCheckBox.check();
        await this.continue.click();
        //await this.page.pause();
    }

    async existingCustomerRegisteration(): Promise<boolean> {
        return await this.existingCustomerErrorMessage.isVisible();
    }

}