import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

// Extends BasePage to inherit generic navigation and waiting methods
// This class is responsible for the login page specific elements and actions
export class LoginPage extends BasePage {
    // Locators for the login page elements
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
        this.flashMessage = page.locator('#flash');
    }

    /**
     * Navigates to the login page.
     */
    async open() {
        logger.info('Navigating to Login Page');
        await this.navigate('/login');
    }

    /**
     * Performs the login action.
     * @param username The username
     * @param password The password
     */
    async login(username: string, password: string) {
        logger.info(`Attempting to login with user: ${username}`);
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    /**
     * Asserts that the success message is displayed.
     */
    async expectLoginSuccess() {
        logger.info('Verifying successful login message');
        await this.expectToBeVisible(this.flashMessage);
        await expect(this.flashMessage).toContainText('You logged into a secure area!');
    }

    /**
     * Asserts that an error message is displayed.
     */
    async expectLoginFailure() {
        logger.info('Verifying failed login message');
        await this.expectToBeVisible(this.flashMessage);
        await expect(this.flashMessage).toContainText('Your username is invalid!');
    }
}
