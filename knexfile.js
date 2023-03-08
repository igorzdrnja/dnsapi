import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_PATH = path.join(__dirname, 'src', 'db');

const commonConfig = {
  client: 'pg',
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
};

const config = {
  development: {
    ...commonConfig,
    connection: {
      database: process.env.POSTGRES_DB || 'postgres',
      user: process.env.DB_ADMIN_USERNAME || 'postgres',
      password: process.env.DB_ADMIN_PASSWORD || 'postgres',
    },
  },
  production: {
    ...commonConfig,
    connection: {
      database: process.env.POSTGRES_DB || 'postgres',
      user: process.env.DB_ADMIN_USERNAME || 'postgres',
      password: process.env.DB_ADMIN_PASSWORD || 'postgres',
    },
  },
};

export default config;
