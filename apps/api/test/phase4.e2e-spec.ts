import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/config/configure-app';
import { CacheService } from '../src/cache/cache.service';

// Uses the existing local PostgreSQL container; cache is mocked for deterministic HTTP tests.
describe('Phase 4 HTTP foundation', () => {
  let app: INestApplication;
  const previousLimit = process.env.API_RATE_LIMIT;
  const previousTtl = process.env.API_RATE_TTL_MS;
  beforeAll(async () => {
    process.env.API_RATE_LIMIT = '8';
    process.env.API_RATE_TTL_MS = '60000';
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(CacheService).useValue({ ping: jest.fn().mockResolvedValue(true) }).compile();
    app = module.createNestApplication();
    configureApp(app);
    await app.init();
  });
  afterAll(async () => {
    if (app) await app.close();
    if (previousLimit === undefined) delete process.env.API_RATE_LIMIT; else process.env.API_RATE_LIMIT = previousLimit;
    if (previousTtl === undefined) delete process.env.API_RATE_TTL_MS; else process.env.API_RATE_TTL_MS = previousTtl;
  });
  it('preserves the root and health routes', async () => {
    await request(app.getHttpServer()).get('/').expect(200);
    const response = await request(app.getHttpServer()).get('/health').expect(200);
    expect(response.body.status).toBe('ok');
  });
  it('wraps data and adds correlation and security headers', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/system/status').expect(200);
    expect(response.body).toMatchObject({ success: true, data: { status: 'ok' }, requestId: expect.any(String) });
    expect(response.headers['x-request-id']).toBe(response.body.requestId);
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });
  it('returns cache status', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/system/status?detail=full').expect(200);
    expect(response.body.data.cache).toBe('up');
  });
  it('rejects invalid and unknown query parameters', async () => {
    for (const query of ['detail=wrong', 'unexpected=true']) {
      const response = await request(app.getHttpServer()).get(`/api/v1/system/status?${query}`).expect(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    }
  });
  it('rejects unknown routes safely', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/missing').expect(404);
    expect(response.body).toMatchObject({ success: false, error: { code: 'HTTP_404' } });
  });
  it('enforces a rate limit', async () => {
    let limited = false;
    for (let i = 0; i < 10; i++) {
      const response = await request(app.getHttpServer()).get('/api/v1/system/status');
      if (response.status === 429) { limited = true; break; }
      expect(response.status).toBe(200);
    }
    expect(limited).toBe(true);
    await request(app.getHttpServer()).get('/health').expect(200);
  });
});
