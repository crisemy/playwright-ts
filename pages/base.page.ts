import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../utils/logger';
import { ENV } from '../config/env.config';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to a specific path relative to the BASE_URL.
     * @param path The path to append to the base URL
     */
    async navigate(path: string = '') {
        const url = `${ENV.BASE_URL}${path}`;
        logger.info(`Navigating to URL: ${url}`);
        await this.page.goto(url);
    }

    /**
     * Gets a locator using a generic selector string.
     * @param selector The locator string
     * @returns Locator object
     */
    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
     * Waits for an element to be visible and clicks on it.
     * @param locator The Locator to click
     */
    async clickElement(locator: Locator) {
        logger.info(`Clicking element: ${locator}`);
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Fills an input field with the provided text.
     * @param locator The Locator of the input field
     * @param text The text to fill
     */
    async fillInput(locator: Locator, text: string) {
        logger.info(`Filling input: ${locator} with text length: ${text.length}`);
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    /**
     * Verifies if an element is visible on the page.
     * @param locator The Locator to check
     */
    async expectToBeVisible(locator: Locator) {
        logger.info(`Expecting element to be visible: ${locator}`);
        await expect(locator).toBeVisible();
    }
}
