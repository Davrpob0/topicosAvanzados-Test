import { Page, Locator, expect } from "@playwright/test";

export class AppPage {
    readonly userPage       : Page;
    readonly taskInputField : Locator;
    readonly taskContainer  : Locator;
    readonly deleteButton   : Locator;

    constructor(page: Page) {
        this.userPage       = page;
        this.taskInputField = this.userPage.locator('#item-input');
        this.taskContainer  = this.userPage.locator('.items');
        this.deleteButton   = this.userPage.locator('#clear-btn');
    }

    waitUntilAppIsReady = async () => {
        await expect(this.taskInputField).toBeVisible();
    }

    addTask = async (taskDescription: string) => {
        await this.taskInputField.click();
        await this.taskInputField.pressSequentially(taskDescription);
        await this.taskInputField.press('Enter');
    }

    markTaskDone = async (taskDescription: string) => {
        const taskCheckbox = this.userPage.locator(`//span[@class = "item-body" and contains(.,"${taskDescription}")]/a/i`);
        await taskCheckbox.click();
    }

    removeCompletedTasks = async () => {
        await this.deleteButton.click();
    }

    confirmTaskAdded = async (taskDescription: string) => {
        await expect(this.taskContainer.getByText(taskDescription)).toHaveClass('active-item');
    }

    confirmTaskCompleted = async (taskDescription: string) => {
        await expect(this.taskContainer.getByText(taskDescription)).toHaveClass('inactive-item');
    }

    verifyTaskRemoval = async (taskDescription: string) => {
        await expect(this.taskContainer).not.toHaveText(taskDescription);
    }
}
