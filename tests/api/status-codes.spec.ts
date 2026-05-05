import { test, expect } from '@playwright/test';
import { StatusCodesClient } from '../../api/status-codes.client';
import { logger } from '../../utils/logger';

// We do not use the UI fixture here, because API testing doesn't need a browser page.
// Instead, we use Playwright's built-in `request` fixture.
test.describe('API Status Codes Functionality - @api', () => {
    let apiClient: StatusCodesClient;

    test.beforeAll(async ({ request }) => {
        logger.info('Setup: Initializing StatusCodes API Client');
        // Initialize our API object model
        apiClient = new StatusCodesClient(request);
    });

    const statusCodesToTest = [200, 301, 404, 500];

    for (const code of statusCodesToTest) {
        test(`Should return ${code} status code when hitting /status_codes/${code} @api`, async ({ request }) => {
            // Because beforeAll hook is run once per worker, we can also instantiate it per test just to be safe
            const client = new StatusCodesClient(request);
            logger.info(`Executing API test for status code: ${code}`);
            
            const response = await client.getStatusCode(code);
            await client.expectResponseStatus(response, code);
        });
    }
});
