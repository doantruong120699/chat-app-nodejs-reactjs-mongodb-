import dotenv from 'dotenv';

let isTest = process.env.NODE_ENV === 'test';
dotenv.config();

export const env = {
    APP_PORT: process.env.APP_PORT,
    APP_ENV: process.env.APP_ENV,
    APP_KEY: process.env.APP_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    WEB_URL: process.env.WEB_URL,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRE: process.env.JWT_EXPIRE || '1d',
        REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d'
    },
    SALT_ROUND: 10,
    ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
    DATABASE: {
        CONNECT: process.env.DATABASE_CONNECT as any,
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME
    },
    FORGOT_PASSWORD_TTL: Number(process.env.FORGOT_PASSWORD_TTL || 15),
    WHITELIST_DOMAINS: (process.env.WHITELIST_DOMAINS || 'localhost').split(','),
    FILE_LIMIT: {
        ASSESSMENT_DOCUMENT: Number(process.env.FILE_LIMIT_ASSESSMENT_DOCUMENT) || 5
    }
};
