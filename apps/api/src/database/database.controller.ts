import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('health')
export class DatabaseController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('ready')
  async ready() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { service: 'kreditsmart-api', status: 'ok', database: 'up' };
    } catch {
      throw new ServiceUnavailableException({
        service: 'kreditsmart-api', status: 'unavailable', database: 'down',
      });
    }
  }
}
