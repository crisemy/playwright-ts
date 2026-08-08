import { APIRequestContext, APIResponse } from '@playwright/test';
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
    async getStatusCode(code: number): Promise<APIResponse> {
        const endpoint = `${ENV.BASE_URL}/status_codes/${code}`;
        logger.info(`Sending GET request to: ${endpoint}`);
        const response = await this.request.get(endpoint);

        logger.info(`Received response with status: ${response.status()}`);
        return response;
    }

    /**
     * Gets a response without automatically following redirects, so its
     * original status can be asserted.
     */
    async getStatusCodeWithoutFollowingRedirects(code: number): Promise<APIResponse> {
        const endpoint = `${ENV.BASE_URL}/status_codes/${code}`;
        logger.info(`Sending GET request without following redirects to: ${endpoint}`);
        const response = await this.request.get(endpoint, { maxRedirects: 0 });

        logger.info(`Received response with status: ${response.status()}`);
        return response;
    }
}
