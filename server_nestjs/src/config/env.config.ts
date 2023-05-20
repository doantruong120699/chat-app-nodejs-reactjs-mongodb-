import dotenv from 'dotenv';

let isTest = process.env.NODE_ENV === 'test';
dotenv.config();

export const env = {
    APP_PORT: process.env.APP_PORT,
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
    WHITELIST_DOMAINS: (process.env.WHITELIST_DOMAINS || 'localhost').split(',')
};
