import { Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

export function isVersionedApi(req: Request): boolean {
  return /^\/api\/v[0-9]+(?:\/|$)/.test(req.path);
}

export function requestId(res: Response): string {
  return String(res.getHeader('X-Request-Id') ?? 'unavailable');
}

const logger = new Logger('HTTP');
export function requestContext(req: Request, res: Response, next: NextFunction): void {
  // Generate our own ID; never trust arbitrary caller-supplied log content.
  const id = randomUUID();
  res.setHeader('X-Request-Id', id);
  const start = process.hrtime.bigint();
  res.once('finish', () => {
    logger.log({ requestId: id, method: req.method, status: res.statusCode,
      durationMs: Math.round(Number(process.hrtime.bigint() - start) / 1e6) });
  });
  next();
}
