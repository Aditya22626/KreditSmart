import { SystemController } from './system.controller';
import { CacheService } from '../cache/cache.service';

describe('SystemController', () => {
  const ping = jest.fn();
  const controller = new SystemController({ ping } as unknown as CacheService);
  beforeEach(() => ping.mockReset());
  it('does not query Redis for basic status', async () => {
    expect(await controller.status({})).toMatchObject({ status: 'ok' });
    expect(ping).not.toHaveBeenCalled();
  });
  it('reports cache up or down', async () => {
    ping.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    expect(await controller.status({ detail: 'full' })).toMatchObject({ cache: 'up' });
    expect(await controller.status({ detail: 'full' })).toMatchObject({ cache: 'down' });
  });
});
