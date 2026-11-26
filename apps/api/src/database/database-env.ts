import { config } from 'dotenv';
import { resolve } from 'node:path';

export function databaseUrl(): string {
  // pnpm --filter api runs with apps/api as the working directory.
  config({ path: resolve(process.cwd(), '../../.env'), quiet: true });
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is missing from the environment');
  return url;
}
