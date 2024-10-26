import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly userPage          : Page;
    readonly testAccountButton : Locator;
    readonly usernameField     : Locator;
    readonly notificationToast : Locator;
    readonly signInButton      : Locator;

    constructor(page: Page) {
        this.userPage          = page;
        this.testAccountButton = this.userPage.getByText('Get a test account');
        this.usernameField     = this.userPage.getByPlaceholder('Username');
        this.notificationToast = this.userPage.locator('#toast-container').getByText('Generate success.');
        this.signInButton      = this.userPage.locator('#login-btn');
    }

    requestTestAccount = async (): Promise<void> => {
        await this.testAccountButton.click();
    }
    
    waitForAccountGeneration = async (): Promise<string> => {
        await expect(this.notificationToast).toHaveText('Generate success.');
        return await this.usernameField.inputValue();
    }
    
    initiateLogin = async (): Promise<void> => {
        await this.signInButton.click();
    }
}
