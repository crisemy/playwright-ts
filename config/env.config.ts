// 
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set in the .env file!`);
    }
    return value;
}

export const ENV = {
    BASE_URL: getEnvVar('BASE_URL'),
    ADMIN_USER: getEnvVar('ADMIN_USER'),
    ADMIN_PASSWORD: getEnvVar('ADMIN_PASSWORD'),
    LOG_LEVEL: getEnvVar('LOG_LEVEL'),
};
