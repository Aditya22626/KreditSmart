import { ServiceUnavailableException } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { PrismaService } from './prisma.service';

describe('DatabaseController', () => {
  const query = jest.fn();
  const controller = new DatabaseController({ $queryRaw: query } as unknown as PrismaService);

  beforeEach(() => { query.mockReset(); });

  it('reports a healthy database', async () => {
    query.mockResolvedValue([{ '?column?': 1 }]);
    await expect(controller.ready()).resolves.toEqual({
      service: 'kreditsmart-api', status: 'ok', database: 'up',
    });
  });

  it('returns service unavailable without leaking database errors', async () => {
    query.mockRejectedValue(new Error('internal database failure'));
    await expect(controller.ready()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
