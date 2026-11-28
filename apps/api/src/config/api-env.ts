import { config } from 'dotenv';
import { resolve } from 'node:path';

function integer(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name];
  const value = raw === undefined ? fallback : Number(raw);
  if (raw === '' || !Number.isInteger(value) || value < min || value > max) {
    throw new Error(`Invalid ${name}: expected integer ${min}–${max}`);
  }
  return value;
}

function connectionUrl(name: string, protocols: string[]): string {
  const raw = process.env[name];
  try {
    if (!raw) throw new Error();
    const url = new URL(raw);
    if (!url.hostname || !protocols.includes(url.protocol)) throw new Error();
    return raw;
  } catch {
    throw new Error(`Invalid or missing ${name}`);
  }
}

export function apiEnv() {
  // Commands are run in apps/api by pnpm --filter api.
  config({ path: resolve(process.cwd(), '../../.env'), quiet: true });
  const mode = process.env.NODE_ENV ?? 'development';
  if (!['development', 'test', 'production'].includes(mode)) {
    throw new Error('Invalid NODE_ENV');
  }
  const origins = (process.env.API_CORS_ORIGINS ??
    'http://localhost:3000,http://127.0.0.1:3000')
    .split(',').map((item) => item.trim()).filter(Boolean);
  for (const origin of origins) {
    try {
      const parsed = new URL(origin);
      if (!['http:', 'https:'].includes(parsed.protocol) || parsed.origin !== origin) throw new Error();
    } catch {
      throw new Error('API_CORS_ORIGINS must contain exact HTTP(S) origins');
    }
  }
  if (!origins.length) throw new Error('API_CORS_ORIGINS must not be empty');
  if (mode === 'production' && (!process.env.API_CORS_ORIGINS || origins.some((o) => !o.startsWith('https://')))) {
    throw new Error('Production requires explicit HTTPS CORS origins');
  }
  connectionUrl('DATABASE_URL', ['postgres:', 'postgresql:']);
  const redisUrl = connectionUrl('REDIS_URL', ['redis:', 'rediss:']);
  const docs = process.env.API_DOCS_ENABLED ?? (mode === 'production' ? 'false' : 'true');
  if (!['true', 'false'].includes(docs)) throw new Error('Invalid API_DOCS_ENABLED');
  if (mode === 'production' && docs === 'true') throw new Error('Public API docs are disabled in production');
  return {
    mode, origins, redisUrl, docsEnabled: docs === 'true',
    port: process.env.PORT !== undefined ? integer('PORT', 4000, 1, 65535) : integer('API_PORT', 4000, 1, 65535),
    host: mode === 'production' ? '0.0.0.0' : '127.0.0.1',
    rateLimit: integer('API_RATE_LIMIT', 120, 1, 10000),
    rateTtl: integer('API_RATE_TTL_MS', 60000, 1000, 3600000),
  };
}
