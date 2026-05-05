// 
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    ADMIN_USER: process.env.ADMIN_USER || 'tomsmith',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'SuperSecretPassword!',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
