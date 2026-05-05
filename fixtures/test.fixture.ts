import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Interface for fixtures
type MyFixtures = {
    loginPage: LoginPage;
};

// Extend base test by providing "loginPage" and other POs
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        // Setup the fixture
        const loginPage = new LoginPage(page);

        // Use the fixture value in the test
        await use(loginPage);

        // Teardown (if needed)
    },
});

export { expect } from '@playwright/test';
