import { test } from '@playwright/test';
import { StatusCodesClient } from '../../api/status-codes.client';
import { logger } from '../../utils/logger';

// We do not use the UI fixture here, because API testing doesn't need a browser page.
// Instead, we use Playwright's built-in `request` fixture.
test.describe('API Status Codes Functionality - @api', () => {
    const statusCodesToTest = [200, 404, 500];

    for (const code of statusCodesToTest) {
        test(`Should return ${code} status code when hitting /status_codes/${code} @api`, async ({ request }) => {
            const client = new StatusCodesClient(request);
            logger.info(`Executing API test for status code: ${code}`);
            
            const response = await client.getStatusCode(code);
            client.expectResponseStatus(response, code);
        });
    }

    test('Should return an un-followed 301 status code @api', async ({ request }) => {
        const client = new StatusCodesClient(request);
        logger.info('Executing API test for status code: 301');

        const response = await client.getStatusCodeWithoutFollowingRedirects(301);

        client.expectResponseStatus(response, 301);
    });
});
