import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_TEST_NAME, ENV } = process.env;

let client: Pool = new Pool();

if (ENV?.trim() === 'test') {
  console.log(`💥 THIS IS TEST`);
  client = new Pool({
    host: DATABASE_HOST as string,
    database: DATABASE_TEST_NAME as string,
    user: DATABASE_USER as string,
    password: DATABASE_PASSWORD as string,
  });
}

if (ENV?.trim() === 'dev') {
  console.log(`💥 THIS IS DEV`);
  client = new Pool({
    host: DATABASE_HOST as string,
    database: DATABASE_NAME as string,
    user: DATABASE_USER as string,
    password: DATABASE_PASSWORD as string,
  });
}

export default client;

//TODO: database configration full_dev
