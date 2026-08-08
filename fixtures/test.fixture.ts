import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Interface for fixtures
type MyFixtures = {
    loginPage: LoginPage;
};

// This is a test-scoped fixture: every test receives a fresh Page and LoginPage.
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
