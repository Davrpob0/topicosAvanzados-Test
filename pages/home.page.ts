import { Page, Locator } from "@playwright/test";

export class IntroPage {
    readonly userPage   : Page;
    readonly loginLink  : Locator;

    constructor(page: Page) {
        this.userPage  = page;
        this.loginLink = this.userPage
                          .getByRole('navigation')
                          .getByRole('link', { name: 'Login' });
    }

    openHomePage = async () => {
        await this.userPage.goto('http://127.0.0.1:5000/#intro');
    }

    navigateLogin = async () => {
        await this.loginLink.click();
    }
}
