import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const client = new Pool({
  host: DATABASE_HOST as string,
  database: DATABASE_NAME as string,
  user: DATABASE_USER as string,
  password: DATABASE_PASSWORD as string,
});

export default client;

//TODO: database configration full_dev
