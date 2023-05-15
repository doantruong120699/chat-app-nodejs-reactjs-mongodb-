import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT: number = parseInt(process.env.DB_PORT);
const DB_HOST = process.env.DB_HOST;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
});
