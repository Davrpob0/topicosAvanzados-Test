import { test } from '@playwright/test';
import { IntroPage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { AppPage } from '../pages/todo.page';

test.describe('Functional Tests', () => {
    const taskDescription = 'Ejecutar Pruebas';

    test.beforeEach(async ({ page }) => {
        test.slow();

        const introPageInstance = new IntroPage(page);
        const authPageInstance = new LoginPage(page);

        await introPageInstance.openHomePage();
        await introPageInstance.navigateLogin();

        await authPageInstance.requestTestAccount();
        await authPageInstance.waitForAccountGeneration();
        await authPageInstance.initiateLogin();
    });

    test('Add new task', async ({ page }) => {
        test.slow();

        const mainAppInstance = new AppPage(page);

        await mainAppInstance.waitUntilAppIsReady();
        await mainAppInstance.addTask(taskDescription);

        await mainAppInstance.confirmTaskAdded(taskDescription);
    });

    test('Mark task as done', async ({ page }) => {
        test.slow();

        const mainAppInstance = new AppPage(page);

        await mainAppInstance.waitUntilAppIsReady();
        await mainAppInstance.addTask(taskDescription);
        await mainAppInstance.markTaskDone(taskDescription);

        await mainAppInstance.confirmTaskCompleted(taskDescription);
    });

    test('Remove all completed tasks', async ({ page }) => {
        test.slow();

        const mainAppInstance = new AppPage(page);

        await mainAppInstance.waitUntilAppIsReady();
        await mainAppInstance.addTask(taskDescription);
        await mainAppInstance.markTaskDone(taskDescription);
        await mainAppInstance.removeCompletedTasks();

        await mainAppInstance.verifyTaskRemoval(taskDescription);
    });
});
