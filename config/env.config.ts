import * as dotenv from 'dotenv';
import * as path from 'path';

// This module is the single owner of local environment-file loading. Values
// supplied by CI or the shell take precedence because dotenv does not override them.
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

// Helper function to get environment variables with validation
function getEnvVar(key: string): string {
    const value = process.env[key];
    if (value === undefined || value.trim() === '') {
        throw new Error(`Environment variable ${key} is required.`);
    }
    return value;
}

export const ENV = {
    BASE_URL: getEnvVar('BASE_URL'),
    ADMIN_USER: getEnvVar('ADMIN_USER'),
    ADMIN_PASSWORD: getEnvVar('ADMIN_PASSWORD'),
    LOG_LEVEL: getEnvVar('LOG_LEVEL'), // Added LOG_LEVEL to the ENV object for logging configuration
};
