import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { apiEnv } from '../config/api-env';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private readonly client = new Redis(apiEnv().redisUrl, {
    lazyConnect: true, enableOfflineQueue: false, maxRetriesPerRequest: 1,
    connectTimeout: 2000, commandTimeout: 1500,
    retryStrategy: (attempt) => Math.min(attempt * 250, 5000),
  });
  onModuleInit(): void {
    this.client.on('error', () => this.logger.warn('Redis connection unavailable'));
    void this.client.connect().catch(() => this.logger.warn('Redis initial connection failed'));
  }
  onModuleDestroy(): void { this.client.disconnect(); }
  async ping(): Promise<boolean> {
    try { return this.client.status === 'ready' && await this.client.ping() === 'PONG'; }
    catch { return false; }
  }
  // Cache only non-sensitive, public, disposable data; not tokens or user financial records.
  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.client.status !== 'ready') return null;
      const value = await this.client.get(`ks:public:v1:${key}`);
      return value === null ? null : JSON.parse(value) as T;
    } catch { return null; }
  }
  async set<T>(key: string, value: T, ttlSeconds: number): Promise<boolean> {
    if (!Number.isInteger(ttlSeconds) || ttlSeconds < 1 || ttlSeconds > 86400) throw new Error('Invalid cache TTL');
    try {
      if (this.client.status !== 'ready') return false;
      const encoded = JSON.stringify(value);
      if (encoded === undefined) return false;
      return await this.client.set(`ks:public:v1:${key}`, encoded, 'EX', ttlSeconds) === 'OK';
    } catch { return false; }
  }
  async delete(key: string): Promise<boolean> {
    try {
      if (this.client.status !== 'ready') return false;
      await this.client.del(`ks:public:v1:${key}`);
      return true;
    } catch { return false; }
  }
}
