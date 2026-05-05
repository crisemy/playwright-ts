import { test } from '../../fixtures/test.fixture';
import { ENV } from '../../config/env.config';
import * as testData from '../../data/testData.json';
import { logger } from '../../utils/logger';

// Test suite for login functionality
test.describe('Login Functionality - @smoke', () => {

    // Before each test, navigate to the login page
    test.beforeEach(async ({ loginPage }) => {
        logger.info('Setup: Navigating to login page before test');
        await loginPage.open();
    });

    // Test case for successful login
    test('Successful login with valid credentials @positive', async ({ loginPage }) => {
        logger.info('Executing positive login test');
        await loginPage.login(ENV.ADMIN_USER, ENV.ADMIN_PASSWORD);
        await loginPage.expectLoginSuccess();
    });

    // Test case for failed login
    test('Failed login with invalid credentials @negative', async ({ loginPage }) => {
        logger.info('Executing negative login test');
        await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
        await loginPage.expectLoginFailure();
    });

});
