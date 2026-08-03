import { Pool } from "pg";
import { loadEnvFile } from "node:process";
loadEnvFile();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

export default pool;
