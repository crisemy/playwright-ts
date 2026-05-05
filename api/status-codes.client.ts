import { APIRequestContext, expect } from '@playwright/test';
import { ENV } from '../config/env.config';
import { logger } from '../utils/logger';

// Class for Status Codes API   
export class StatusCodesClient {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Hits the status_codes endpoint with a specific code.
     * @param code The HTTP status code to test (e.g., 200, 301, 404, 500)
     */
    async getStatusCode(code: number) {
        const endpoint = `${ENV.BASE_URL}/status_codes/${code}`;
        logger.info(`Sending GET request to: ${endpoint}`);
        const response = await this.request.get(endpoint);

        logger.info(`Received response with status: ${response.status()}`);
        return response;
    }

    /**
     * Asserts that the response status matches the expected code.
     */
    async expectResponseStatus(response: any, expectedStatus: number) {
        logger.info(`Validating response status is ${expectedStatus}`);
        expect(response.status()).toBe(expectedStatus);
    }
}
