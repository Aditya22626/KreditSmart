import { randomUUID } from 'node:crypto';
import { setTimeout } from 'node:timers/promises';
import { strict as assert } from 'node:assert';
import { CacheService } from '../src/cache/cache.service';

async function main(): Promise<void> {
  const cache = new CacheService();
  const key = `smoke:${randomUUID()}`;
  cache.onModuleInit();
  try {
    for (let attempt = 0; attempt < 30 && !(await cache.ping()); attempt++) await setTimeout(200);
    assert.equal(await cache.ping(), true, 'Redis unavailable');
    assert.equal(await cache.set(key, { sample: true }, 2), true);
    assert.deepEqual(await cache.get(key), { sample: true });
    await setTimeout(2200);
    assert.equal(await cache.get(key), null);
    assert.equal(await cache.set(key, 1, 30), true);
    assert.equal(await cache.delete(key), true);
    assert.equal(await cache.get(key), null);
    console.log('PASS: Redis connection, read/write, TTL expiry, deletion');
  } finally {
    await cache.delete(key);
    cache.onModuleDestroy();
  }
}
void main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
